import plugins from './build/plugins/index';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    plugins: [...plugins],
    external: ['dotenv', 'telegraf', 'i18next'],
};
