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
                    _a.trys.push([0, 2, 3, 5]);
                    console.log("engagement logger table seeded");
                    return [4 /*yield*/, dbIndex_1.default.query("\n            INSERT INTO test_engagement_logger (recordid, zoomid, name, poll_completion_rate, screen_share_time, screen_share_switch_freq, average_engagement_grade, week_number)\n            VALUES\n            (123, 'John Doe', 0.75, 20.5, 5, 'Good', 1),\n            (456, 'Jane Smith', 0.85, 15.2, 8, 'Excellent', 2),\n            (789, 'Bob Johnson', 0.62, 30.0, 3, 'Fair', 3),\n            (987, 'Alice Williams', 0.92, 18.3, 6, 'Excellent', 4),\n            (654, 'Charlie Brown', 0.78, 25.7, 4, 'Good', 5),\n            (321, 'Eva Davis', 0.69, 22.1, 7, 'Fair', 6),\n            (555, 'Sam Taylor', 0.88, 12.6, 9, 'Excellent', 7),\n            (777, 'Olivia White', 0.71, 28.4, 2, 'Good', 8),\n            (888, 'Michael Lee', 0.80, 16.8, 5, 'Fair', 9),\n            (999, 'Sophia Harris', 0.95, 14.2, 8, 'Excellent', 10);\n        ")];
                case 1:
                    _a.sent();
                    console.log("Test database seeded with data");
                    return [3 /*break*/, 5];
                case 2:
                    error_1 = _a.sent();
                    console.error("Database seeding failed: ", error_1);
                    return [3 /*break*/, 5];
                case 3: 
                // End the pool
                return [4 /*yield*/, dbIndex_1.default.end()];
                case 4:
                    // End the pool
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
