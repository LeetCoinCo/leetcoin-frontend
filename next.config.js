// next.config.js

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const withTM = require("next-transpile-modules")([
  // `monaco-editor` isn't published to npm correctly: it includes both CSS
  // imports and non-Node friendly syntax, so it needs to be compiled.
  "monaco-editor",
]);

module.exports = withTM({
  webpack: (config, options) => {
    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes("_app")
      );
    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/,
      ];
    }
    // when `isServer` is `true`, building (`next build`) fails with the following error:
    // "Conflict: Multiple assets emit different content to the same filename ../main.js.nft.json"
    if (!options.isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: [
            "json",
            "markdown",
            "css",
            "typescript",
            "javascript",
            "html",
            "graphql",
            "python",
            "scss",
            "yaml",
            "rust",
            "sol",
            "solidity",
          ],
          filename: "static/[name].worker.js",
        })
      );
    }
    return config;
  },
});
