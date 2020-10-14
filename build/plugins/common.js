import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';

const projectRootDir = path.resolve(__dirname);

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
    typescript(),
    alias({
        entries: [
            { find: 'src', replacement: path.resolve(projectRootDir, 'src') },
        ],
    }),
];
