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
var dbIndex_1 = require("../../dbIndex");
// Table List
// 1. Engagement Logger
// recordid, zoomid, name, Poll completion rate, Screen share time, Screen share switch freq, Average engagement grade, Week number
// 2. Attendance
// recordid, zoomid, name, Todays attendance hours, Total attendance hours, Total days attended, Missing streak
// 3. Zoom Polls
// recordid, Zoom poll id, Zoom poll date, Zoom poll time, Poor, Average, Good, Response rate, Respondants, Non-respondants
// 4. name Picker
// recordid, zoomid, name
// 5. (Bootcampers)
// recordid, zoomid, name, (profile picture)
function resetDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 8, 10]);
                    console.log("delete tables if they exist");
                    // Drop existing tables if they exist
                    return [4 /*yield*/, dbIndex_1.default.query("\n            DROP TABLE IF EXISTS test_engagement_logger CASCADE;\n            DROP TABLE IF EXISTS test_attendance CASCADE;\n            DROP TABLE IF EXISTS test_zoom_polls CASCADE;\n            DROP TABLE IF EXISTS test_name_picker CASCADE;\n            DROP TABLE IF EXISTS test_bootcampers CASCADE\n        ")];
                case 1:
                    // Drop existing tables if they exist
                    _a.sent();
                    console.log("creating engagement_logger table");
                    // Create the engagement_logger table
                    return [4 /*yield*/, dbIndex_1.default.query("\n            CREATE TABLE test_engagement_logger (\n              recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n              zoomid INT,\n              name VARCHAR(255) NOT NULL,\n              poll_completion_rate REAL,\n              screen_share_time REAL,\n              screen_share_switch_freq INT,\n              average_engagement_grade VARCHAR(255),\n              week_number INT   \n            );\n        ")];
                case 2:
                    // Create the engagement_logger table
                    _a.sent();
                    console.log("creating attendance table");
                    // Create the Attendance table
                    return [4 /*yield*/, dbIndex_1.default.query("\n        CREATE TABLE test_attendance (\n            recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n            zoomid INT,\n            name VARCHAR(255) NOT NULL,\n            todays_attendance_hours REAL,\n            total_attendance_hours REAL,\n            total_days_attended INT,\n            missing_streak REAL\n            );\n        ")];
                case 3:
                    // Create the Attendance table
                    _a.sent();
                    console.log("creating zoom polls table");
                    // Create the zoom polls table
                    return [4 /*yield*/, dbIndex_1.default.query("\n        CREATE TABLE test_zoom_polls (\n            recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n            zoom_poll_id INT,\n            zoom_poll_date DATE,\n            zoom_poll_time REAL,\n            poor INT,\n            average INT,\n            good INT,\n            response_rate REAL,\n            respondants INT[],\n            non_respondants INT[]\n            );\n        ")];
                case 4:
                    // Create the zoom polls table
                    _a.sent();
                    console.log("creating name_picker table");
                    // Create the name picker table
                    return [4 /*yield*/, dbIndex_1.default.query("\n            CREATE TABLE test_name_picker (\n              recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n              zoomid INT,\n              name VARCHAR(255) NOT NULL\n            );\n        ")];
                case 5:
                    // Create the name picker table
                    _a.sent();
                    console.log("creating bootcampers table");
                    // Create the name bootcampers
                    return [4 /*yield*/, dbIndex_1.default.query("\n            CREATE TABLE test_bootcampers (\n              recordid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n              zoomid INT,\n              name VARCHAR(255) NOT NULL\n              );\n        ")];
                case 6:
                    // Create the name bootcampers
                    _a.sent();
                    console.log("all tables created db reset complete");
                    return [3 /*break*/, 10];
                case 7:
                    error_1 = _a.sent();
                    console.error("Database reset failed: ", error_1);
                    return [3 /*break*/, 10];
                case 8: 
                // End the pool
                return [4 /*yield*/, dbIndex_1.default.end()];
                case 9:
                    // End the pool
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, resetDatabase()];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); })();
