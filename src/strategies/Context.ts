import { ChatData } from 'Bot';
import { Context } from 'telegraf';
import Strategy from 'strategies/Strategy';
import GetEventNameStrategy from 'strategies/GetEventNameStrategy';

export default class EventCreationContext {
    private strategy: Strategy | null = null;

    public init(ctx: Context) {
        this.setStrategy(new GetEventNameStrategy(ctx));
    }

    public setStrategy(strategy: Strategy | null) {
        this.strategy = strategy;
    }

    public hasStrategy(): boolean {
        return !!this.strategy;
    }

    public executeStrategy(ctx: Context, chatData: ChatData) {
        return this.strategy && this.strategy.execute(ctx, chatData);
    }
}
