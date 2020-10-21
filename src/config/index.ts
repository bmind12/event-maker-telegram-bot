import dotenv from 'dotenv';
import initI18next from 'config/i18n';

export default async (onConfigInit: Function) => {
    dotenv.config();
    await initI18next();
    onConfigInit();
};
