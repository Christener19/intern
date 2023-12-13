// import block
import * as engagementModel from "../models/engagementModel";

// api request handlers

// GET Poll completion
export async function getPollCompletionRate(zoomID : number, testCheck : boolean) {
  
  // table to run call on
  let tableName : string = 'engagement_logger'
  // check if this is a test or a real api call
  if (testCheck) {
    tableName = 'test_' + tableName
  }

  try {
    const pollCompRate = await engagementModel.getPollCompletionRate(zoomID, tableName)
    return pollCompRate;
  } catch (error) {
    console.error("Error in getPollCompletionRate controller", error);
  }
}

// GET screenshare time
export async function getScreenShareTime(zoomID : number, testCheck : boolean) {

  // table to run call on
  let tableName : string = 'engagement_logger'
  // check if this is a test or a real api call
  if (testCheck) {
    tableName = 'test_' + tableName
  }

  try {
    const screenShareTime = await engagementModel.getScreenShareTime(zoomID, tableName)
    return screenShareTime;
  } catch (error) {
    console.error("Error in getScreenShareFreq controller", error);
  }
}

// GET screenshare freq
export async function getScreenShareFreq(zoomID : number, testCheck : boolean) {

  // table to run call on
  let tableName : string = 'engagement_logger'
  // check if this is a test or a real api call
  if (testCheck) {
    tableName = 'test_' + tableName
  }

  try {
    const screenShareFreq = await  engagementModel.getScreenShareFreq(zoomID, tableName);
    return screenShareFreq;
  } catch (error) {
    console.error("Error in getAbsentBootcampers controller", error);
  }
}

// GET engagment card props
export async function getEngagementCardData(zoomID : number, testCheck : boolean) {

  // table to run call on
  let tableName : string = 'engagement_logger'
  // check if this is a test or a real api call
  if (testCheck) {
    tableName = 'test_' + tableName
  }

  try {
    const engagementCardData = await engagementModel.getEngagementCardData(zoomID, tableName);
    return engagementCardData;
  } catch (error) {
    console.error("Error in getEngagementCardData controller", error);
  }
}

// PATCH avegage engagement data for a bootcamper
export async function patchEngagmentGrade(zoomId : number, week_number : number, average_engagement_grade : string, testCheck : boolean) {

    // table to run call on
    let tableName : string = 'engagement_logger'
    // check if this is a test or a real api call
    if (testCheck) {
      tableName = 'test_' + tableName
    }

    // console log to check
    console.log(`Controller: zoomid = ${zoomId}`)
    console.log(`Controller: week_number = ${week_number}`)
    console.log(`Controller: average_engagement_grade = ${average_engagement_grade}`)

  try {
    // call getEngagementCardData from model
    const patchEngagmentGrade = await engagementModel.patchEngagmentGrade(
      zoomId,
      week_number,
      average_engagement_grade,
      tableName,
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
