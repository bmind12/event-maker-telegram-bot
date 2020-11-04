import i18next from 'i18next';
import { Context } from 'telegraf';
import { ChatData } from 'Bot';
import Strategy from 'strategies/Strategy';
import GetEventStartDateStrategy from 'strategies/GetEventStartDateStrategy';

export default class GetEventNameStrategy extends Strategy {
    constructor(ctx: Context) {
        super();

        ctx.reply(i18next.t('strategy.getName'));
    }

    public execute(ctx: Context, chatData: ChatData) {
        const eventName = ctx.update.message?.text;

        if (!eventName) return;

        chatData.event.setTitle(eventName);
        chatData.eventCreationContext.setStrategy(
            new GetEventStartDateStrategy(ctx),
        );
    }
}
