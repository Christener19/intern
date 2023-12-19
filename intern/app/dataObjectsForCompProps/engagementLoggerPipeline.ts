// import block
import { mainRoute, getRoute, patchRoute } from "../../utils/APIRouteSetter";
const baseURL = mainRoute();
import findBreakPoints from "../../utils/engagementAlgo/findBreakPoints";
import findMedian from "../../utils/engagementAlgo/findMedian";
import getScoreForBootcamper from "../../utils/engagementAlgo/getScoreForBootcamper";

// This updates the data that feeds the engagement logger cards

// GET the data points from the database
export async function allScreenDataFetcher(weekNumber: number) {
  // debug loggers
  // console.log(weekNumber)
  // console.log(`allScreen URL: ${baseURL}${getRoute}getAllScreenData?weeknumber=${weekNumber}`)
  // console.log(`allBootcampers URL: ${baseURL}${getRoute}getAllScreenData?weeknumber=${weekNumber}`)

  // Freq Screen Switch for all as an array
  // Total screen share for all as an array
  console.log("getting all screen data");
  const allScreenData = await fetch(
    `${baseURL}${getRoute}getAllScreenData?weeknumber=${weekNumber}`
  );

  // clean up response json
  const allScreenDataJSON = await allScreenData.text();
  const allScreenDataClean = JSON.parse(allScreenDataJSON);
  const allScreenDataPayload = allScreenDataClean.data.data;
  // console.log(allScreenDataPayload) // debug logger

  // deconstruct json object into the two arrays
  const allScreenTimeArr: number[] = allScreenDataPayload.allScreenTime.map(
    (singleValue) => singleValue["screen_share_time"]
  );
  const allScreenSwitchArr: number[] = allScreenDataPayload.allScreenSwitch.map(
    (singleValue) => singleValue["screen_share_switch_freq"]
  );
  // debug loggers
  //   console.log("allScreenTimeArr");
  //   console.log(allScreenTimeArr);
  //   console.log("allScreenSwitchArr");
  //   console.log(allScreenSwitchArr);

  // Calculate median for each
  const screenShareMedian = findMedian(allScreenTimeArr);
  const screenSwitchMedian = findMedian(allScreenSwitchArr);
  // debug loggers
  // console.log(`screenShareMedian: ${screenShareMedian}`)
  // console.log(`screenSwitchMedian: ${screenSwitchMedian}`)

  // Calculate the breakpoints () from the medians
  const screenShareBreakPoint = findBreakPoints(0.15, 0.3, screenShareMedian);
  const screenSwitchFreqBreakPoint = findBreakPoints(
    0.2,
    0.4,
    screenSwitchMedian
  );
  // debug loggers
  //   console.log(`screenShareBreakPoint`);
  //   console.log(screenShareBreakPoint);
  //   console.log(`screenSwitchFreqBreakPoint}`);
  //   console.log(screenSwitchFreqBreakPoint);

  // get all bootcampers and clean up into array of objects
  const allBootcampers = await fetch(
    `${baseURL}${getRoute}getBootcampersForEngagement?weeknumber=${weekNumber}`
  );
  interface bootcamperData {
    screenShareTotal: number;
    screenSwitchFreqTotal: number;
    pollCompletionRate: number;
    zoomID: number;
  }
  const allBootcampersJSON = await allBootcampers.text();
  const allBootcampersArr = JSON.parse(allBootcampersJSON);
  const allBootcampersPayload = allBootcampersArr.data.data;
  console.log("bootcamperArr check");
  //console.log(allBootcampersPayload);

  // restructure it into the right format
  const bootcampers: bootcamperData = allBootcampersPayload.map((entry) => ({
    zoomID: Number(entry.zoomid),
    screenShareTotal: Number(entry.screen_share_time),
    screenSwitchTotal: Number(entry.screen_share_switch_freq),
    pollCompletionRate: Number(entry.poll_completion_rate),
  }));

  //   console.log(bootcampers);
  // Create return object
  return {
    // array of objects of each bootcamper {id, screenshareData, screenSwitchData, pollCompletionRate}
    bootcampers,
    // breakpoints {ScreenShare, ScreenSwitch}
    breakpoints: {
      screenShareBreakPoint,
      screenSwitchFreqBreakPoint,
    },
  };
}

const dave = async () => {
  const logger = await allScreenDataFetcher(1);
  console.log(logger);
};

// dave();

// Takes bootcamper engagement data and converts to a grade
export default async function getAllEngagementGrades(weekNumber: number) {
  // fetch all zoomIDs
  // const zoomIDs = [23, 24, 56, 67];
  //intalising return array
  const CreatedArry = [];

  const allBootcamper = await allScreenDataFetcher(weekNumber);
  //console.log(`Number of bootcampers: ${allBootcamper.bootcampers.length}`);

  // start for loop
  // Get score for ID
  // check if there is any data
  // if data doesn't exist -> throw error
  // if data does exist -> patch

  for (let i = 0; i < allBootcamper.bootcampers.length; i++) {
    // console.log(
    //   `Getting score for: ${allBootcamper.bootcampers[i].zoomID} ${i} of ${allBootcamper.bootcampers.length}`
    // );
    // console.log(
    //   `details of bootcamper: zoomID: ${allBootcamper.bootcampers[i].zoomID} screenShare: ${allBootcamper.bootcampers[i].screenShareTotal}, screenShareSwitch: ${allBootcamper.bootcampers[i].screenSwitchTotal}
    //   pollCompletionRate: ${allBootcamper.bootcampers[i].pollCompletionRate}`
    // );
    let bootcamperScore = await getScoreForBootcamper(
      allBootcamper.bootcampers[i],
      allBootcamper.breakpoints
    );
    // patch record in database by zoomID and weekNumber
    //console.log(`${bootcamperScore}`)
    CreatedArry.push({
      zoomID: allBootcamper.bootcampers[i].zoomID,
      bootcamperScore,
    });
  }
  // Great return object
  // array of objects of each bootcamper {id, grade, week number}
  return CreatedArry;
}

const Bill = async () => {
  const logger = await getAllEngagementGrades(1);
  console.log(logger);
};

// Bill();
//  getAllEngagementGrades(1);

// Start loop to go thru every bootcamper in the database
export async function allEngagementGradePatcher(weekNumber: number) {
  // get the array of updated records to pat
  const patchArray: any = await getAllEngagementGrades(weekNumber);
  // init loop
  for (let i = 0; i < patchArray.length; i++) {
    // set patch data
    let zoomId = patchArray[i].zoomID;
    let data: any = {
      week_number: weekNumber,
      average_engagement_grade: patchArray[i].bootcamperScore,
    };
    // debug logger
    // console.log('data object')
    // console.log(data)

    // tracking logger
    console.log(
      `patching zoomID: ${zoomId}, grade: ${patchArray[i].bootcamperScore} record ${i} of ${patchArray.length}`
    );
    // PATCH the Average engagment value by ID
    await fetch(
      `
        ${baseURL}${patchRoute}patchEngagementGrade?zoomId=${zoomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    // debug loggers
    console.log(
      `Patch URL = ${baseURL}${patchRoute}patchEngagmentGrade?zoomId=${zoomId}`
    );
    console.log("payload");
    console.log(JSON.stringify(data));
  }
  console.log("patching complete");
}

// test runner - real thing needs to work on an onclick function
allEngagementGradePatcher(1);
