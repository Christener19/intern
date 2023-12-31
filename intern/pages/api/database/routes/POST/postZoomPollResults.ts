// import block
import { NextApiRequest, NextApiResponse } from "next";
import * as zoomPollsController from "../../controllers/zoomPollsController";

// Main API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Handle PATCH request
  if (method === "POST") {
    return handlePostRequest(req, res);
  }

  // If the method is not allowed, set the appropriate headers and status
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}

// Function to handle POST request
async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    // check if it's a test (default to true)
    const testQuery: boolean = req.query.testCheck !== null && req.query.testCheck !== undefined;

    // Extract parameters from the request
    const zoomPollID = Number(req.query.zoomPollID);
    const data = req.body;

    // console log to check
    console.log(`Router: zoomid = ${zoomPollID}`)
    console.log(`Router: data = ${data}`)

    // Call the registerBootcamperAttendance function from the controller
    const postPollData = await zoomPollsController.patchPollResults(
      zoomPollID,
      data,
      testQuery
    );

    // If the registration fails, return a 404 response
    if (!postPollData) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "ZoomId not found" } });
    }

    // Return a success response
    res.status(200).json({ status: "success", data: postPollData });
  } catch (error) {
    // Handle errors and return a 500 response
    console.error("Error in patchPollResults:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

// test

// http://localhost:3000/api/database/attendanceRoutes

// need to break this into seperate files to use the routing function
