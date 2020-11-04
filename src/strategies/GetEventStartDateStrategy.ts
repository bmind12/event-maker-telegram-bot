import i18next from 'i18next';
import { Context } from 'telegraf';
import { ChatData } from 'Bot';
import { DateType } from 'Event';
import Strategy from 'strategies/Strategy';
import GetAllDayStrategy from 'strategies/GetAllDayStrategy';

export default class GetEventStartDateStrategy extends Strategy {
    constructor(ctx: Context) {
        super();

        ctx.reply(i18next.t('strategy.getStartDate'));
    }

    public execute(ctx: Context, chatData: ChatData) {
        const eventDate = ctx.update.message?.text;

        if (!eventDate) return;

        chatData.event.setDate(eventDate, DateType.Start);
        chatData.eventCreationContext.setStrategy(new GetAllDayStrategy(ctx));
    }
}
