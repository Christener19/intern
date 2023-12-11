// getTotalScreenShare will takin in ZoomID
// get call to look at screen share time for user and for all cohort
// calc median screen share
// calc break points
// Switch
// median -15% =  3pts
// median -16% => -30% = 2pts
// media -31% = 1pt

// return score (1-3)
import findMedian from "./findMedian";

function getTotalScreenShare(zoomID: number) {
  console.log(`Getting Total Screen Share for ${zoomID}`);
  let score = 0;
  // Get call to look up Total Screen Share time
  // Get call to look up cohort Screen Share time

  let totalScreenShareTime = 0;
  let cohortScreenShareArr = [2, 4, 5, 6];

  let median = findMedian(cohortScreenShareArr);
}

getTotalScreenShare(34);
