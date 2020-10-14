require('dotenv').config();
import { Telegraf, Context } from 'telegraf';

const token = process.env.BOT_TOKEN;

if (!token) throw new Error('BOT_TOKEN global variable is missing');

const bot = new Telegraf(token);

bot.start((ctx: Context) => ctx.reply('Hello! 🤖'));
bot.help((ctx: Context) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx: Context) => ctx.reply('👍'));
bot.hears('hi', (ctx: Context) => ctx.reply('Hey there'));
bot.launch();
