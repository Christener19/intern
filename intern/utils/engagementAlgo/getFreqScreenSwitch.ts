// getFreqScreenSwitch is a function to take in ZoomID
// Get call to look up screen share switch
// Switch:
// Calc median
// Calc Breakpoints
// median -20% = 3 pts
// median -21% => -40% = 2 pts
// median -41% = 1 pt
// Return score (1-3)

// import block
import findMedian from "./findMedian";
import findBreakPoints from "./findBreakPoints";

export default function getFreqScreenSwitch(zoomID: number, breakPoints: any, freqScreenSwitchNum: number): number {
  console.log(`Getting freq screen switch for ${zoomID}`);
  let score = 0;

  // GET call to look up freq screen switch
  // GET call to look up cohort screen switch arr

  // hard code testing vals
  //let freqScreenSwitchNum = 5;
  //let cohortScreenSwitchArr = [5, 9, 2, 10];

  // calc median and breakpoints
  // let median = findMedian(cohortScreenSwitchArr);
  // let breakPoints = findBreakPoints(0.2, 0.4, median);

  switch (true) {
    // good
    case freqScreenSwitchNum >= breakPoints.goodBP:
      score = 3;
      break;
    // average
    case freqScreenSwitchNum < breakPoints.goodBP &&
      freqScreenSwitchNum >= breakPoints.averageBP:
      score = 2;
      break;
    // poor
    default:
      score = 1;
  }

  return score;
}

// console.log(getFreqScreenSwitch(33));
// median is 7
// good is 5.6+
// average is 4.2+
// poor is less than 4.2
