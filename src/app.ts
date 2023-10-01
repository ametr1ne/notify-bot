import { Job } from "node-schedule";
import { Context, Telegraf } from "telegraf";
import "dotenv/config";
import { Update } from "telegraf/typings/core/types/typegram";
const schedule = require("node-schedule");

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

const compliments = ["милая", "малыш", "солнышко", "зайка", "пупсик", "котеночек", "малышек"];

let scheduled: Job | null = null;

bot.start(async (ctx) => {
  ctx.reply(
    `Привет, малыш) Я буду тебе напоминать о том, что тебе нужно выпить таблетки каждый день.`
  )

  scheduled = schedule.scheduleJob("0 14 * * *", function () {
    const index = Math.floor(Math.random() * 7);
    ctx.sendMessage("что нужно выпить таблетку, " + compliments[index]);
  });
});

bot.command("stop", (ctx) => {
  if (scheduled) {
    scheduled.cancel();
    scheduled = null;
    ctx.reply("Теперь напоминания выключены :)");
  } else {
    ctx.reply("Нечего отключать");
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
