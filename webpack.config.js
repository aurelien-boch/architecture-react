require("dotenv").config();

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const buildDirectory = process.env.SERVER_BUILD || "build/server/";

module.exports = {
    entry: "./server/index.tsx",
    target: "node",
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, buildDirectory),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: [{
                    loader: "ts-loader",
                    options: {
                        configFile: "../tsconfig.json"
                    }
                }],
                exclude: path.resolve(__dirname, "/node_modules"),
                resolve: {
                    extensions: [".ts", ".tsx", ".json"]
                }
            }
        ]
    }
};
