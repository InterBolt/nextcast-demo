
        const PreloadManifest = {
  "/about/(somegroup)/other/page": [
    "data_A"
  ],
  "/about/(somegroup)/page": [
    "data_A"
  ],
  "/about/inner/page": [
    "data_A"
  ],
  "/about/page": [
    "data_A"
  ]
} as const;

        export default PreloadManifest;
    