use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
require("dotenv/config");
var schedule = require("node-schedule");
var bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
var compliments = ["милая", "малыш", "солнышко", "зайка", "пупсик", "котеночек", "малышек"];
var scheduled = null;
bot.start(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.reply("\u041F\u0440\u0438\u0432\u0435\u0442, \u043C\u0430\u043B\u044B\u0448) \u042F \u0431\u0443\u0434\u0443 \u0442\u0435\u0431\u0435 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0442\u044C \u043E \u0442\u043E\u043C, \u0447\u0442\u043E \u0442\u0435\u0431\u0435 \u043D\u0443\u0436\u043D\u043E \u0432\u044B\u043F\u0438\u0442\u044C \u0442\u0430\u0431\u043B\u0435\u0442\u043A\u0438 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C.");
        scheduled = schedule.scheduleJob("0 18 * * *", function () {
            var index = Math.floor(Math.random() * 7);
            ctx.sendMessage("что нужно выпить таблетку, " + compliments[index]);
        });
        return [2 /*return*/];
    });
}); });
bot.command("stop", function (ctx) {
    if (scheduled) {
        scheduled.cancel();
        scheduled = null;
        ctx.reply("Теперь напоминания выключены :)");
    }
    else {
        ctx.reply("Нечего отключать");
    }
});
bot.launch();
// Enable graceful stop
process.once("SIGINT", function () { return bot.stop("SIGINT"); });
process.once("SIGTERM", function () { return bot.stop("SIGTERM"); });
