import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts'],
    }),
    resolve(),
    commonJS({
        include: 'node_modules/**',
    }),
    json(),
];
