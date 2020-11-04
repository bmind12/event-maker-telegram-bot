import i18next from 'i18next';
import { Context } from 'telegraf';
import { ChatData } from 'Bot';
import { DateType } from 'Event';
import Strategy from 'strategies/Strategy';
import GetEventEndDateStrategy from 'strategies/GetEventEndDateStrategy';

export default class GetEventStartTimeStrategy extends Strategy {
    constructor(ctx: Context) {
        super();

        ctx.reply(i18next.t('strategy.getStartTime'));
    }

    public execute(ctx: Context, chatData: ChatData) {
        const eventDate = ctx.update.message?.text;

        if (!eventDate) return;

        chatData.event.setTime(eventDate, DateType.Start);
        chatData.eventCreationContext.setStrategy(
            new GetEventEndDateStrategy(ctx),
        );
    }
}
