const PreloadManifest = {
  "/(marketing)/sales/page": [
    "data_B"
  ],
  "/about/(somegroup)/other/page": [
    "data_A",
    "data_B"
  ],
  "/about/example/page": [
    "data_B",
    "data_C"
  ],
  "/about/page": [
    "data_B",
    "data_C"
  ],
  "/page": [
    "data_B"
  ]
} as const;

export default PreloadManifest;