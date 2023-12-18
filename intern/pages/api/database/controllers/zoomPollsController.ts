// import block
import * as zoomPollsModel from "../models/zoomPollsModel";

// api request handlers

// GET Poll results
export async function getPollResults(zoomPollID: number | undefined, testCheck: boolean) {
  let tableName: string = 'zoom_polls';
  if (!testCheck) {
    tableName = 'test_' + tableName;
  }

  try {
    // If zoomPollID is not provided, fetch the latest poll result
    if (zoomPollID === undefined) {
      const latestPollResult = await zoomPollsModel.getLatestPollResult(tableName);
      return latestPollResult;
    }

    // If zoomPollID is provided, fetch the specified poll result
    const pollResults = await zoomPollsModel.getPollResults(zoomPollID, tableName);
    return pollResults;
  } catch (error) {
    console.error("Error in getPollResults controller", error);
  }
}

// export async function getPollResults(zoomPollID : number, testCheck : boolean) {
  
//   // table to run call on
//   let tableName : string = 'zoom_polls'
//   // check if this is a test or a real api call
//   if (!testCheck) {
//     tableName = 'test_' + tableName
//   }

//   try {
//     const pollResults = await zoomPollsModel.getPollResults(zoomPollID, tableName)
//     return pollResults;
//   } catch (error) {
//     console.error("Error in getPollCompletionRate controller", error);
//   }
// }

// POST new poll results
export async function postNewPollResults(ZoomPollID : number, resultsPayload : zoomPollsModel.ResultsType, testCheck : boolean) {

    // table to run call on
    let tableName : string = 'zoom_polls'
    // check if this is a test or a real api call
    if (!testCheck) {
      tableName = 'test_' + tableName
    }


  try {
    // call getEngagementCardData from model
    const NewPollResults = await zoomPollsModel.postNewPollResults(
      ZoomPollID,
      resultsPayload,
      tableName,
    );

    // assume 404 status if the zoomID is not found
    if (!NewPollResults) {
      return { status: "fail", data: { msg: "ZoomId not found" } };
    }

    // Return a success response
    return { status: "success", data: NewPollResults };
  } catch (error) {
    console.error("Error in patchEngagmentGrade controller", error);
    return { status: "error", message: "Internal server error" };
  }
}

// PATCH poll results
export async function patchPollResults(ZoomPollID : number, resultsPayload : zoomPollsModel.ResultsType, testCheck : boolean) {

  // table to run call on
  let tableName : string = 'zoom_polls'
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = 'test_' + tableName
  }


try {
  // call getEngagementCardData from model
  const patchPollData = await zoomPollsModel.postNewPollResults(
    ZoomPollID,
    resultsPayload,
    tableName,
  );

  // assume 404 status if the zoomID is not found
  if (!patchPollData) {
    return { status: "fail", data: { msg: "ZoomId not found" } };
  }

  // Return a success response
  return { status: "success", data: patchPollData };
} catch (error) {
  console.error("Error in patchEngagmentGrade controller", error);
  return { status: "error", message: "Internal server error" };
}
}