"use strict";
// getTotalScreenShare will takin in ZoomID
// get call to look at screen share time for user and for all cohort
// calc median screen share
// calc break points
// Switch
// median -15% =  3pts
// median -16% => -30% = 2pts
// media -31% = 1pt
Object.defineProperty(exports, "__esModule", { value: true });
var findMedian_1 = require("./findMedian");
var findBreakPoints_1 = require("./findBreakPoints");
// return score (1-3)
function getTotalScreenShare(zoomID) {
    console.log("Getting Total Screen Share for ".concat(zoomID));
    var score = 0;
    // Get call to look up Total Screen Share time
    // Get call to look up cohort Screen Share time
    var totalScreenShareTime = 3.14;
    var cohortScreenShareArr = [2, 4, 5, 6];
    var median = (0, findMedian_1.default)(cohortScreenShareArr);
    var breakPoints = (0, findBreakPoints_1.default)(.15, 0.3, median);
    switch (true) {
        // good
        case (totalScreenShareTime >= breakPoints.goodBP):
            score = 3;
            break;
        // average
        case (totalScreenShareTime < breakPoints.goodBP && totalScreenShareTime >= breakPoints.averageBP):
            score = 2;
            break;
        // poor
        default:
            score = 1;
    }
    return score;
}
console.log(getTotalScreenShare(65));
