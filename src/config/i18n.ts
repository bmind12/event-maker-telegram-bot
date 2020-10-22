import i18next from 'i18next';
import en from 'resources/locales/en.json';

const config = {
    lng: 'en',
    debug: process.env.BUILD === 'development',
    resources: {
        en: {
            translation: en,
        },
    },
};

export default async function init() {
    await i18next.init(config);
}
