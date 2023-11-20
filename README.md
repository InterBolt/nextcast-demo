# A demo repo for [NextCast](https://github.com/interbolt/nextcast)

Find more info about this repo in [this blog post](https://interbolt.org/blog/nextcast/).

## How to run

```bash
npm i
npm run dev
```

## Nextcast plugin code

The plugin code can be found and modified at `nextcasts/index.ts`. Data produced by the plugin can be found at `.nextcast/preload_manifest/`.

## Where is the `PreloadManifest` file from the blog post?

In this blog post, [https://interbolt.org/blog/nextcast/](https://interbolt.org/blog/nextcast/), I describe why we need to create a `PreloadManifest` file. After running either `npm run dev` or `npm run build`, you should see the generated file at `shared/PreloadManifest.ts`.

## How to trigger eslint errors from NextCast

Navigate to `src/components/DynamicComponent.tsx` and find the commented out call to `usePreloadedData`. Uncomment that call and re-run `npm run dev/build`.
