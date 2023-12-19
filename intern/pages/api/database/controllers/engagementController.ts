// import block
import * as engagementModel from "../models/engagementModel";

// api request handlers

// GET Poll completion
export async function getPollCompletionRate(
  zoomID: number,
  testCheck: boolean
) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  try {
    const pollCompRate = await engagementModel.getPollCompletionRate(
      zoomID,
      tableName
    );
    return pollCompRate;
  } catch (error) {
    console.error("Error in getPollCompletionRate controller", error);
  }
}

// GET screenshare time
export async function getScreenShareTime(zoomID: number, testCheck: boolean) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  try {
    const screenShareTime = await engagementModel.getScreenShareTime(
      zoomID,
      tableName
    );
    return screenShareTime;
  } catch (error) {
    console.error("Error in getScreenShareFreq controller", error);
  }
}

// GET screenshare freq
export async function getScreenShareFreq(zoomID: number, testCheck: boolean) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  try {
    const screenShareFreq = await engagementModel.getScreenShareFreq(
      zoomID,
      tableName
    );
    return screenShareFreq;
  } catch (error) {
    console.error("Error in getAbsentBootcampers controller", error);
  }
}

// GET engagment card props
export async function getEngagementCardData(
  zoomID: number,
  testCheck: boolean
) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  try {
    const engagementCardData = await engagementModel.getEngagementCardData(
      zoomID,
      tableName
    );
    return engagementCardData;
  } catch (error) {
    console.error("Error in getEngagementCardData controller", error);
  }
}

// PATCH avegage engagement data for a bootcamper
export async function patchEngagmentGrade(
  zoomId: number,
  week_number: number,
  average_engagement_grade: string,
  testCheck: boolean
) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  // console log to check
  console.log(`Controller: zoomid = ${zoomId}`);
  console.log(`Controller: week_number = ${week_number}`);
  console.log(
    `Controller: average_engagement_grade = ${average_engagement_grade}`
  );

  try {
    // call getEngagementCardData from model
    const patchEngagmentGrade = await engagementModel.patchEngagmentGrade(
      zoomId,
      week_number,
      average_engagement_grade,
      tableName
    );

    // assume 404 status if the zoomID is not found
    if (!patchEngagmentGrade) {
      return { status: "fail", data: { msg: "ZoomId not found" } };
    }

    // Return a success response
    return { status: "success", data: patchEngagmentGrade };
  } catch (error) {
    console.error("Error in patchEngagmentGrade controller", error);
    return { status: "error", message: "Internal server error" };
  }
}

// PATCH poll completion rate for a bootcamper
export async function patchPollCompletion(
  zoomId: number,
  week_number: number,
  poll_completion_rate: number,
  testCheck: boolean
) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  // console log to check
  console.log(`Controller: zoomid = ${zoomId}`);
  console.log(`Controller: week_number = ${week_number}`);
  console.log(`Controller: poll_completion_rate = ${poll_completion_rate}`);

  try {
    // call getEngagementCardData from model
    const patchPollCompletionRate = await engagementModel.patchPollCompletion(
      zoomId,
      week_number,
      poll_completion_rate,
      tableName
    );

    // assume 404 status if the zoomID is not found
    if (!patchPollCompletionRate) {
      return { status: "fail", data: { msg: "ZoomId not found" } };
    }

    // Return a success response
    return { status: "success", data: patchPollCompletionRate };
  } catch (error) {
    console.error("Error in patchEngagmentGrade controller", error);
    return { status: "error", message: "Internal server error" };
  }
}

// PATCH screen share time for a bootcamper
export async function patchScreenShareTime(
  zoomId: number,
  week_number: number,
  screen_share_time: number,
  testCheck: boolean
) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  // console log to check
  console.log(`Controller: zoomid = ${zoomId}`);
  console.log(`Controller: week_number = ${week_number}`);
  console.log(`Controller: screen_share_time = ${screen_share_time}`);

  try {
    // call getEngagementCardData from model
    const patchScreenShare = await engagementModel.patchScreenShareTime(
      zoomId,
      week_number,
      screen_share_time,
      tableName
    );

    // assume 404 status if the zoomID is not found
    if (!patchScreenShare) {
      return { status: "fail", data: { msg: "ZoomId not found" } };
    }

    // Return a success response
    return { status: "success", data: patchScreenShare };
  } catch (error) {
    console.error("Error in patchEngagmentGrade controller", error);
    return { status: "error", message: "Internal server error" };
  }
}

// PATCH screen share switch freq for a bootcamper
export async function patchScreenShareSwitchFreq(
  zoomId: number,
  week_number: number,
  screen_share_switch_freq: number,
  testCheck: boolean
) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  // console log to check
  console.log(`Controller: zoomid = ${zoomId}`);
  console.log(`Controller: week_number = ${week_number}`);
  console.log(
    `Controller: screen_share_switch_freq = ${screen_share_switch_freq}`
  );

  try {
    // call getEngagementCardData from model
    const patchScreenShareSwitchRate =
      await engagementModel.patchScreenShareSwitchFreq(
        zoomId,
        week_number,
        screen_share_switch_freq,
        tableName
      );

    // assume 404 status if the zoomID is not found
    if (!patchScreenShareSwitchRate) {
      return { status: "fail", data: { msg: "ZoomId not found" } };
    }

    // Return a success response
    return { status: "success", data: patchScreenShareSwitchRate };
  } catch (error) {
    console.error("Error in patchEngagmentGrade controller", error);
    return { status: "error", message: "Internal server error" };
  }
}

export async function getAllScreenData(testCheck: boolean, weekNumber: number) {
  // table to run all on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  console.log(`running query on ${tableName}`);

  // retry function
  let retryCounter = 0;
  const maxRetries = 7;

  while (retryCounter < maxRetries) {
    console.log(`attempting fetch ${retryCounter + 1} of ${maxRetries}`);
    try {
      // call functions from model
      console.log("getting allscreentime");
      const allScreenTime = await engagementModel.getAllScreenTime(
        tableName,
        weekNumber
      );
      console.log("getting allscreenswitch");
      const allScreenSwitch = await engagementModel.getAllScreenSwitch(
        tableName,
        weekNumber
      );
      // return both in an object
      return {
        status: "success",
        data: {
          allScreenTime,
          allScreenSwitch,
        },
      };
    } catch (error) {
      console.error("Error in getAllScreenData", error);
      // Retry logic, continue to the next iteration of the loop
      retryCounter += 1;
    }
  }

  // Return an error response after multiple retries
  return {
    status: 'error',
    message: 'failed to fetch screen data after multiple retries',
  };
}

// GET all bootcampers data to engagementGrade
export async function getBootcampersDataArr(
  testCheck: boolean,
  weekNumber: number
) {
  // table to run all on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  console.log(`running query on ${tableName}`);

  try {
    // call functions from model
    console.log("getting all bootcamper data");
    const allBootcampersData = await engagementModel.getBootcampersDataArr(
      tableName,
      weekNumber
    );
    // return both in an object
    return { status: "success", data: allBootcampersData };
    // if fail, throw error
  } catch (error) {
    console.error("Error in getAllScreenData");
  }
}

// GET Engagement Card Props by week
export async function getEngagementCardPropsByWeek(
  weekNumber: number,
  testCheck: boolean
) {
  // table to run call on
  let tableName: string = "engagement_logger";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  try {
    const engagementCardProp =
      await engagementModel.getEngagementCardPropsByWeek(weekNumber, tableName);
    return engagementCardProp;
  } catch (error) {
    console.error("Error in getPollCompletionRate controller", error);
  }
}
