import i18next from 'i18next';
import { Context } from 'telegraf';
import { ChatData } from 'Bot';
import { DateType } from 'Event';
import Strategy from 'strategies/Strategy';
import GetEventEndTimeStrategy from 'strategies/GetEventEndTimeStrategy';
import GetEventLocationStrategy from 'strategies/GetEventLocationStrategy';

// TODO: try to combine Start/End Date strategies (if possible)
export default class GetEventEndDateStrategy extends Strategy {
    constructor(ctx: Context) {
        super();

        ctx.reply(i18next.t('strategy.getEndDate'));
    }

    public execute(ctx: Context, chatData: ChatData) {
        const eventDate = ctx.update.message?.text;

        if (!eventDate) return;

        chatData.event.setDate(eventDate, DateType.End);

        if (chatData.event.isAllDay()) {
            chatData.eventCreationContext.setStrategy(
                new GetEventLocationStrategy(ctx),
            );
        } else {
            chatData.eventCreationContext.setStrategy(
                new GetEventEndTimeStrategy(ctx),
            );
        }
    }
}
