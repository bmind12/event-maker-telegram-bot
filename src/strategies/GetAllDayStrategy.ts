import i18next from 'i18next';
import { Context } from 'telegraf';
import { ChatData } from 'Bot';
import Strategy from 'strategies/Strategy';
import GetEventEndDateStrategy from 'strategies/GetEventEndDateStrategy';
import GetEventStartTimeStrategy from 'strategies/GetEventStartTimeStrategy';

export default class GetAllDayStrategy extends Strategy {
    constructor(ctx: Context) {
        super();

        ctx.reply(i18next.t('strategy.getAllDay'));
    }

    public execute(ctx: Context, chatData: ChatData) {
        const allDay = ctx.update.message?.text?.toLocaleLowerCase() === 'yes';

        chatData.event.setAllDay(allDay);

        if (allDay) {
            chatData.eventCreationContext.setStrategy(
                new GetEventEndDateStrategy(ctx),
            );
        } else {
            chatData.eventCreationContext.setStrategy(
                new GetEventStartTimeStrategy(ctx),
            );
        }
    }
}
