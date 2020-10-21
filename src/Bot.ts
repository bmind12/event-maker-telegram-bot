import { Telegraf, Context } from 'telegraf';
import i18next from 'i18next';

const DEFAULT_USERNAME = 'my friend';

export default class Bot {
    private bot: Telegraf<Context>;

    constructor(token?: string) {
        if (!token || typeof token !== 'string')
            throw new Error(
                `Telegram bot token [string] is required. But got: ${token}`,
            );

        this.bot = new Telegraf(token);
    }

    public start() {
        this.bot.start(this.onStart);
        this.bot.launch();
    }

    private onStart(ctx: Context) {
        ctx.reply(
            i18next.t('welcome', {
                name: ctx.chat?.first_name || DEFAULT_USERNAME,
            }),
        );
    }
}
