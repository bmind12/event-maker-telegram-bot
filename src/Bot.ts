import { Telegraf, Context } from 'telegraf';
import i18next from 'i18next';
import Event from 'Event';
import EventCreationContext from 'strategies/Context';

const DEFAULT_USERNAME = 'my friend';

enum Command {
    Create = 'create',
}

export interface ChatData {
    event: Event;
    isCreateMode: boolean;
    eventCreationContext: EventCreationContext;
}

interface ChatDataById {
    [chatId: string]: ChatData;
}

export default class Bot {
    private bot: Telegraf<Context>;
    private chatData: ChatDataById = {};

    constructor(token?: string) {
        if (!token || typeof token !== 'string')
            throw new Error(
                `Telegram bot token [string] is required. But got: ${token}`,
            );

        this.bot = new Telegraf(token);
    }

    public start() {
        this.bot.start(this.onStart);
        this.bot.command(Command.Create, (ctx: Context) =>
            this.initCreate(ctx),
        );
        this.bot.on('message', (ctx: Context) => this.runStrategy(ctx));
        this.bot.launch();
    }

    private onStart(ctx: Context) {
        ctx.reply(
            i18next.t('welcome', {
                name: this.getUsername(ctx),
            }),
        );
    }

    private initCreate(ctx: Context) {
        const chatId = this.getChatId(ctx);

        if (!chatId) return this.replyGenericError(ctx);

        this.chatData[chatId] = {
            event: new Event(),
            isCreateMode: true,
            eventCreationContext: new EventCreationContext(),
        };

        this.runStrategy(ctx);
    }

    private runStrategy(ctx: Context) {
        const chatId = this.getChatId(ctx);
        const userChatData = chatId && this.chatData[chatId];

        if (!userChatData || !userChatData.isCreateMode)
            return this.replyDefault(ctx);

        const { eventCreationContext } = userChatData;

        if (!eventCreationContext.hasStrategy()) {
            eventCreationContext.init(ctx);
        } else {
            eventCreationContext.executeStrategy(ctx, userChatData);
        }
    }

    private replyDefault(ctx: Context) {
        ctx.reply(i18next.t('default', { name: this.getUsername(ctx) }));
    }

    private replyGenericError(ctx: Context) {
        ctx.reply(i18next.t('error.default'));
    }

    private getUsername(ctx: Context) {
        return ctx.chat?.first_name || DEFAULT_USERNAME;
    }

    private getChatId(ctx: Context) {
        return ctx.chat?.id;
    }
}
