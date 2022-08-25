"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertHourToMinutes(time) {
    const [hour, minutes] = time.split(':').map(Number);
    const TimeInMinutes = (hour * 60) + minutes;
    return TimeInMinutes;
}
exports.default = convertHourToMinutes;
//# sourceMappingURL=convertHourToMinutes.js.map