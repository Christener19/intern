// Plan
// getScoreForBootcamper  function to manage all scoring and returning of engagement data

// getScoreForBootcamper func take ? argument (ZoomID)

// Polls data
// return the score

// Total screen time
// return the score

// Freq of screen switch
// return the score

// Switch? or of statement

// if score is =< 8
// return Good

// if score is < 6
// return Average

// else (score is lower than 6)
// return Poor

// Function code

//import block
import getPolls from "./getPolls";
import getTotalScreenShare from "./getTotalScreenShare";
import getFreqScreenSwitch from "./getFreqScreenSwitch";

export default function getScoreForBootcamper(breakPoints: object, bootcamperData: object[]): string {

  // deconstruct objects for use
    // zoomID
    const zoomID = bootcamperData.zoomId
    // screen share data values
    const bootcamperScreenShareTotal : number = bootcamperData.screenShareTotal
    // screen share breakpoint
    const screenShareBreakPoint: object = breakPoints.screenShare
    // Switch freq data values
    const bootcamperScreenSwitchFreqTotal : number = bootcamperData.screenSwitchFreqTotal
    // switch freq breakpoint
    const switchFreqBreakPoint: object = breakPoints.switchFreq


  let total =
    getPolls(zoomID, bootcamperData.pollCompletionRate) +
    getFreqScreenSwitch(zoomID, switchFreqBreakPoint, bootcamperScreenSwitchFreqTotal) +
    getTotalScreenShare(zoomID, screenShareBreakPoint, bootcamperScreenShareTotal);
  let grade = "";

  switch (true) {
    // good
    case total >= 8:
      grade = "good";
      break;
    // average
    case total < 8 && total >= 6:
      grade = "average";
      break;
    // poor
    default:
      grade = "poor";
      break;
  }

  return grade;
}
