import { Context } from 'telegraf';
import { ChatData } from 'Bot';

export default abstract class Strategy {
    abstract execute(ctx: Context, chatData: ChatData): void;
}
