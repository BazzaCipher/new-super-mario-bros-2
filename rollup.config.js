import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: "app/scripts/index.js",
    output: {
        file: "app/bundle.js",
        format: "iife",
    },
    plugins: [
        nodeResolve(),
        commonjs()
    ]
};
