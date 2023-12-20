"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findMedian(cohortScreenShareArr) {
    cohortScreenShareArr.sort(function (a, b) { return a - b; });
    var middleIndex = Math.floor(cohortScreenShareArr.length / 2);
    if (cohortScreenShareArr.length % 2 === 0) {
        return ((cohortScreenShareArr[middleIndex - 1] +
            cohortScreenShareArr[middleIndex]) /
            2);
    }
    else {
        return cohortScreenShareArr[middleIndex];
    }
}
exports.default = findMedian;
