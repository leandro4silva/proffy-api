"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const convertHourToMinutes_1 = __importDefault(require("../utils/convertHourToMinutes"));
class ClassesController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = request.query;
            const subject = filters.subject;
            const week_day = filters.week_day;
            const time = filters.time;
            if (!filters.subject || !filters.week_day || !filters.time) {
                return response.status(400).json({
                    error: "Missing filters to search classes"
                });
            }
            const timeInMinutes = (0, convertHourToMinutes_1.default)(time);
            const classes = yield (0, connection_1.default)('classes')
                .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`. `class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
            })
                .where('classes.subject', '=', subject)
                .join('users', 'classes.user_id', '=', 'users.id').select(['classes.*', 'users.*']);
            return response.json(classes);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;
            const trx = yield connection_1.default.transaction();
            try {
                const insertUsersIds = yield trx('users').insert({
                    name,
                    avatar,
                    whatsapp,
                    bio
                });
                const user_id = insertUsersIds[0];
                const insertClassesIds = yield trx('classes').insert({
                    subject,
                    cost,
                    user_id
                });
                const class_id = insertClassesIds[0];
                const classSchedule = schedule.map((scheduleItem) => {
                    return {
                        class_id,
                        week_day: scheduleItem.week_day,
                        from: (0, convertHourToMinutes_1.default)(scheduleItem.from),
                        to: (0, convertHourToMinutes_1.default)(scheduleItem.to)
                    };
                });
                yield trx('class_schedule').insert(classSchedule);
                yield trx.commit();
                return response.status(201).send();
            }
            catch (error) {
                yield trx.rollback();
                return response.status(400).json({
                    error: "unexpected error while creating new class"
                });
            }
        });
    }
}
exports.default = ClassesController;
//# sourceMappingURL=ClassesController.js.map