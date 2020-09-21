import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
    },
    plugins: [
        resolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.js', '.ts'],
        }),
    ],
};
