const path = require("path");

module.exports = {
  entry: "./src/index.js",
  devServer: {
    devtool: "inline-source-map",
    static: {
      directory: path.join(__dirname, "dist"),
    },
    watchFiles: ["src/**/*.js", "dist/**/*.css", "dist/index.html"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
