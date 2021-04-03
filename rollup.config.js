import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'app/scripts/index.js',
    output: {
        file: 'app/bundle.js',
        format: 'iife',
    },
    plugins: [
        nodeResolve()
    ]
};
