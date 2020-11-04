import i18next from 'i18next';
import { Context } from 'telegraf';
import { ChatData } from 'Bot';
import { DateType } from 'Event';
import Strategy from 'strategies/Strategy';
import GetEventLocationStrategy from 'strategies/GetEventLocationStrategy';

// TODO: try to combine Start/End Time strategies (if possible)
export default class GetEventEndTimeStrategy extends Strategy {
    constructor(ctx: Context) {
        super();

        ctx.reply(i18next.t('strategy.getEndTime'));
    }

    public execute(ctx: Context, chatData: ChatData) {
        const eventDate = ctx.update.message?.text;

        if (!eventDate) return;

        chatData.event.setTime(eventDate, DateType.End);

        chatData.eventCreationContext.setStrategy(
            new GetEventLocationStrategy(ctx),
        );
    }
}
