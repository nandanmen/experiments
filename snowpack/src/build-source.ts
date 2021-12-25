const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/index.jsx", "src/App.jsx"],
  outdir: "src/dist",
  format: "esm",
});
