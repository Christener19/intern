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
// Seed the engagement logger table
// Seed the attendance table
// Seed the Zoom polls table
// Seed the name picker table
// Seed the bootcampers table
function TestSeedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, 7, 9]);
                    console.log("engagement logger table seeded");
                    return [4 /*yield*/, dbIndex_1.default.query("\n            INSERT INTO test_engagement_logger (zoomid, name, poll_completion_rate, screen_share_time, screen_share_switch_freq, average_engagement_grade, week_number)\n            VALUES\n            (123, 'John Doe', 0.75, 20.5, 5, 'Good', 1),\n            (456, 'Jane Smith', 0.85, 15.2, 8, 'Excellent', 2),\n            (789, 'Bob Johnson', 0.62, 30.0, 3, 'Fair', 3),\n            (987, 'Alice Williams', 0.92, 18.3, 6, 'Excellent', 4),\n            (654, 'Charlie Brown', 0.78, 25.7, 4, 'Good', 5),\n            (321, 'Eva Davis', 0.69, 22.1, 7, 'Fair', 6),\n            (555, 'Sam Taylor', 0.88, 12.6, 9, 'Excellent', 7),\n            (777, 'Olivia White', 0.71, 28.4, 2, 'Good', 8),\n            (888, 'Michael Lee', 0.80, 16.8, 5, 'Fair', 9),\n            (999, 'Sophia Harris', 0.95, 14.2, 8, 'Excellent', 10);\n        ")];
                case 1:
                    _a.sent();
                    console.log("attendance table seeded");
                    return [4 /*yield*/, dbIndex_1.default.query("\n            INSERT INTO test_attendance (zoomid, name, todays_attendance_hours, total_attendance_hours, total_days_attended, missing_streak)\n            VALUES\n            (123, 'John Doe', 4.5, 50.2, 30, 0),\n            (456, 'Jane Smith', 5.8, 42.1, 28, 0),\n            (789, 'Bob Johnson', 3.2, 60.0, 35, 1),\n            (987, 'Alice Williams', 6.3, 38.7, 26, 0),\n            (654, 'Charlie Brown', 4.7, 55.8, 32, 1),\n            (321, 'Eva Davis', 5.1, 48.2, 29, 0),\n            (555, 'Sam Taylor', 3.6, 51.4, 31, 0),\n            (777, 'Olivia White', 7.2, 33.4, 22, 0),\n            (888, 'Michael Lee', 4.8, 44.7, 27, 1),\n            (999, 'Sophia Harris', 6.7, 40.1, 25, 0);\n        ")];
                case 2:
                    _a.sent();
                    console.log("zoom polls table seeded");
                    return [4 /*yield*/, dbIndex_1.default.query("\n            INSERT INTO test_zoom_polls (zoom_poll_id, zoom_poll_date, zoom_poll_time, poor, average, good, response_rate, respondants, non_respondants)\n            VALUES\n            (101, '2023-01-01', 14.5, 2, 5, 3, 0.85, ARRAY[123, 456, 789], ARRAY[1]),\n            (102, '2023-01-02', 12.3, 1, 4, 5, 0.92, ARRAY[987, 654, 321], ARRAY[1]),\n            (103, '2023-01-03', 15.8, 3, 2, 5, 0.78, ARRAY[555, 777, 888], ARRAY[1]),\n            (104, '2023-01-04', 13.2, 2, 3, 5, 0.91, ARRAY[999, 123, 456], ARRAY[1]),\n            (105, '2023-01-05', 11.7, 1, 4, 5, 0.88, ARRAY[321, 555, 777], ARRAY[1]),\n            (106, '2023-01-06', 14.1, 3, 2, 5, 0.79, ARRAY[888, 999, 987], ARRAY[1]),\n            (107, '2023-01-07', 16.6, 4, 1, 5, 0.94, ARRAY[654, 555, 321], ARRAY[1]),\n            (108, '2023-01-08', 10.4, 1, 4, 5, 0.86, ARRAY[987, 777, 888], ARRAY[1]),\n            (109, '2023-01-09', 13.8, 2, 3, 5, 0.89, ARRAY[456, 999, 555], ARRAY[1]),\n            (110, '2023-01-10', 12.2, 1, 4, 5, 0.93, ARRAY[888, 777, 654], ARRAY[1]);\n        ")];
                case 3:
                    _a.sent();
                    console.log("name picker table seeded");
                    return [4 /*yield*/, dbIndex_1.default.query("\n            INSERT INTO test_name_picker (zoomid, name)\n            VALUES\n            (123, 'John Doe'),\n            (456, 'Jane Smith'),\n            (789, 'Bob Johnson'),\n            (987, 'Alice Williams'),\n            (654, 'Charlie Brown'),\n            (321, 'Eva Davis'),\n            (555, 'Sam Taylor'),\n            (777, 'Olivia White'),\n            (888, 'Michael Lee'),\n            (999, 'Sophia Harris');\n        ")];
                case 4:
                    _a.sent();
                    console.log("bootcampers table seeded");
                    return [4 /*yield*/, dbIndex_1.default.query("\n            INSERT INTO test_bootcampers (zoomid, name)\n            VALUES\n            (123, 'John Doe'),\n            (456, 'Jane Smith'),\n            (789, 'Bob Johnson'),\n            (987, 'Alice Williams'),\n            (654, 'Charlie Brown'),\n            (321, 'Eva Davis'),\n            (555, 'Sam Taylor'),\n            (777, 'Olivia White'),\n            (888, 'Michael Lee'),\n            (999, 'Sophia Harris');\n        ")];
                case 5:
                    _a.sent();
                    console.log("Test database seeded with data");
                    return [3 /*break*/, 9];
                case 6:
                    error_1 = _a.sent();
                    console.error("Database seeding failed: ", error_1);
                    return [3 /*break*/, 9];
                case 7: 
                // End the pool
                return [4 /*yield*/, dbIndex_1.default.end()];
                case 8:
                    // End the pool
                    _a.sent();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, TestSeedDatabase()];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); })();
