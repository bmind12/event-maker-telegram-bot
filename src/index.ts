import initConfig from 'config';
import Bot from 'Bot';

function start() {
    new Bot(process.env.BOT_TOKEN).start();
}

initConfig(start);
