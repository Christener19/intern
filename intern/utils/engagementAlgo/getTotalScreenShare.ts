// getTotalScreenShare will takin in ZoomID
// get call to look at screen share time for user and for all cohort
// calc median screen share
// calc break points
// Switch
// median -15% =  3pts
// median -16% => -30% = 2pts
// media -31% = 1pt

import findMedian from "./findMedian";
import findBreakPoints from "./findBreakPoints";

// return score (1-3)

export default function getTotalScreenShare(
  zoomID: number,
  screenShareBreakPoint: {},
  bootcamperScreenShareTotal: number
): number {
  console.log(`Getting Total Screen Share for ${zoomID}`);
  let score = 0;
  // Get call to look up Total Screen Share time
  // Get call to look up cohort Screen Share time

  // hard code testing vals
  // let totalScreenShareTime = 20;
  // let cohortScreenShareArr = [2, 4, 5, 6];

  // Bootcampers details from database
  // const bootcamperTotalScreenShare = 4

  // calc median and breakpoints
  // let median = findMedian(cohortScreenShareArr);
  // let breakPoints = findBreakPoints(0.15, 0.3, median);

  switch (true) {
    // good
    case bootcamperScreenShareTotal >= screenShareBreakPoint.goodBP:
      score = 3;
      break;
    // average
    case bootcamperScreenShareTotal < screenShareBreakPoint.goodBP &&
      bootcamperScreenShareTotal >= screenShareBreakPoint.averageBP:
      score = 2;
      break;
    // poor
    default:
      score = 1;
  }

  return score;
}

console.log(getTotalScreenShare(65, 6));
