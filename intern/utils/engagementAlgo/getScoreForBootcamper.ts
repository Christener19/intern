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

export default function getScoreForBootcamper(
  bootcamperData: any,
  breakPoints: any,
  ): string {
  // console.log(`$(breakPoints)`);
  // console.log(`$(bootcamperData)`);
  console.log("Started function getScoreForBootcamper");
  // deconstruct objects for use
  // zoomID
  const zoomID = bootcamperData.zoomID;
  console.log(`zoomID ${zoomID}`);
  // screen share data values
  const bootcamperScreenShareTotal: number = bootcamperData.screenShareTotal;
  console.log(`SreenShare: ${bootcamperScreenShareTotal}`);
  // screen share breakpoint
  const screenShareBreakPoint: object = breakPoints.screenShareBreakPoint;
  console.log(`screenShareBreakPoint: ${screenShareBreakPoint}`);
  // Switch freq data values
  const bootcamperScreenSwitchFreqTotal: number =
    bootcamperData.screenSwitchTotal;
  console.log(`ScreenShareSwitch: ${bootcamperScreenSwitchFreqTotal}`);
  // switch freq breakpoint
  const switchFreqBreakPoint: object = breakPoints.screenSwitchFreqBreakPoint;
  console.log(`switch Freq BP: ${switchFreqBreakPoint}`);
  // poll completetion rate
  const pollCompletionRate: number = bootcamperData.pollCompletionRate;
  console.log(`pollCompletionRate: ${pollCompletionRate}`);

  let total =
    getPolls(zoomID, pollCompletionRate) +
    getFreqScreenSwitch(
      zoomID,
      switchFreqBreakPoint,
      bootcamperScreenSwitchFreqTotal
    ) +
    getTotalScreenShare(
      zoomID,
      screenShareBreakPoint,
      bootcamperScreenShareTotal
    );
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
