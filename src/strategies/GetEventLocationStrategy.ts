import i18next from 'i18next';
import { Context } from 'telegraf';
import { ChatData } from 'Bot';
import Strategy from 'strategies/Strategy';

export default class GetEventLocationStrategy extends Strategy {
    constructor(ctx: Context) {
        super();

        ctx.reply(i18next.t('strategy.getLocation'));
    }

    public execute(ctx: Context, chatData: ChatData) {
        let location = ctx.update.message?.text;

        if (!location) return;

        location = location.toLocaleLowerCase() === 'no' ? '' : location;
        chatData.event.setLocation(location);

        chatData.isCreateMode = false;
        ctx.reply(chatData.event.getEventLink());
        chatData.eventCreationContext.setStrategy(null);
    }
}
