import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import run from '@rollup/plugin-run';
import commonJS from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json';

const isDevelopment = process.env.BUILD === 'development'

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    plugins: [
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.js', '.ts'],
        }),
        resolve(),
        commonJS({
            include: 'node_modules/**'
        }),
        json(),
        isDevelopment && run()
    ],
    external: ['express']
};
