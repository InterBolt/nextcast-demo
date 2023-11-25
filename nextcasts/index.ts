import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { TNextcast } from "nextcast";
import { dirname, resolve } from "path";

type CollectedData = {
  dataType: string;
  route: string;
};

class PreloadManifestPlugin {
  public name = "preload_manifest";

  public collector: TNextcast.Collector = (Ctx, Api) => {
    // `Ctx.routes`: Array<{ name: string, files: string[], entries: string[] }>
    // Description: an array of objects where each object contains the following information about
    // a given NextJS route: a list of nextjs-specific entry files (layout, page, template, etc),
    // all of the files which might contribute code to a route after recursively following an entry
    // file's imports, and the name of a route
    Ctx.routes.forEach(({ name, files }) => {
      files.forEach((file) => {
        // `Api._.getImports`: (file: string) => Array<{
        //   file: string;
        //   exportName?: "dynamic" | "default" | string;
        //   assignee?: string;
        // }>;
        // Description: an experimental utility function that returns info about each imported function or
        // component in a given file.
        // Note: It's aware of components imported with next/dynamic.
        const fileImports = Api._.getImports(file);

        const pathToPreloaderHook = resolve(
          process.cwd(),
          "src",
          "usePreloadedData.ts"
        );

        // Search the file imports for the one that is our preloader hook.
        const importedPreloaderHook = fileImports.find((resolvedImport) => {
          const isPreloadHookFile = resolvedImport.file === pathToPreloaderHook;
          const isDefault = resolvedImport.exportName === "default";

          return isPreloadHookFile && isDefault;
        });

        // The name of the variable to which we assigned the preloader hook import.
        if (!importedPreloaderHook?.assignee) {
          return;
        }

        // `Api.traverse`: (file: string, traversalOptions: BabelTraversalOptions) => void
        // Description: a utility function that wraps https://www.npmjs.com/package/@babel/traverse
        // to ensure that any file supplied in the first argument isn't parsed more than
        // once across NextCast plugins.
        Api.traverse(file, {
          // Visit each CallExpression and search for `userPreloadData()` calls
          CallExpression: (path) => {
            const isHookCall =
              path.node.callee.type === "Identifier" &&
              path.node.callee.name === importedPreloaderHook.assignee;
            if (!isHookCall) {
              return;
            }

            // Typescript will probably prevent this, but in case a future dev does something unexpected
            // this will provide a nice linter error via `reportError` to notify them that our plugin
            // expects this argument to exist.
            if (path.node.arguments.length !== 1) {
              // `Api.reportError`: (message: string, file: string, astNode: BabelASTNode) => void
              // Description: saves an error to a JSON file that `eslint-plugin-nextcast` uses to
              // display linter errors.
              // Note: Use `Api.reportWarning` with the same parameter types to display a linter warning
              // instead.
              Api.reportError(
                `\`usePreloadedData\` expects a single arg.`,
                file,
                path.node
              );

              // return early because we don't need to collect
              // call data for invalid uses. That's not really helpful for
              // anything.
              return;
            }

            // Show a linter error for something like: `usePreloadedData(dataVar)`
            // but not `usePreloadedData("dashboard")`.
            if (path.node.arguments[0].type !== "StringLiteral") {
              Api.reportError(
                `A non-StringLiteral argument was supplied to \`usePreloadedData\``,
                file,
                path.node
              );

              // similarly to above, return early when we hit an error
              return;
            }

            const collected: CollectedData = {
              dataType: path.node.arguments[0].value,
              route: name,
            };

            // `Api.collect`: (data: any) => void
            // Description: this function stores data in a JSON file containing a flat array
            // JSON objects.
            // We call it here so that we can build our `PreloaderManifest` file in the reducer method.
            Api.collect(collected);
          },
        });
      });
    });
  };

  public builder: TNextcast.Builder = async (_Ctx, Api) => {
    // The preload manifest file that we set out to create
    const PreloadManifest: Record<string, Array<string>> = {};

    // `Api.getCollected`: () => Array<JSONValue>
    // Description: A function that returns the data collected in the previous phase.
    Api.getCollected().forEach(({ dataType, route }: CollectedData) => {
      if (typeof PreloadManifest[route] === "undefined") {
        PreloadManifest[route] = [];
      }
      if (!PreloadManifest[route].includes(dataType)) {
        PreloadManifest[route].push(dataType);
      }
    });

    Api.save(PreloadManifest);
  };

  public rewriter: TNextcast.Rewriter = async (_Ctx, Api) => {
    // NextCast plugins always run at the project root, so using process.cwd()
    // is the safest way to build FS paths.
    const pathToSharedManifest = resolve(
      process.cwd(),
      "shared",
      "PreloadManifest.ts"
    );

    if (!existsSync(dirname(pathToSharedManifest))) {
      throw new Error(
        `The dir ${dirname(pathToSharedManifest)} does not exist.`
      );
    }

    await writeFile(
      pathToSharedManifest,
      `const PreloadManifest = ${JSON.stringify(
        Api.getSaved(),
        null,
        2
      )} as const;

export default PreloadManifest;`
    );
  };
}

const NextCastPlugins = [new PreloadManifestPlugin()];

export default NextCastPlugins;
