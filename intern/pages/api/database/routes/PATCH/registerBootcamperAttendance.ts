// import block
import { NextApiRequest, NextApiResponse } from "next";
import * as attendanceController from "../../controllers/attendanceController";

// Main API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Handle PATCH request
  if (method === "PATCH") {
    return handlePatchRequest(req, res);
  }

  // If the method is not allowed, set the appropriate headers and status
  res.setHeader("Allow", ["PATCH"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}

// Function to handle PATCH request
async function handlePatchRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    // check if it's a test (default to true)
    const testQuery: boolean =
      req.query.testCheck !== null && req.query.testCheck !== undefined;

    // Extract parameters from the request
    const zoomId = String(req.query.zoomId);
    const data = req.body;

    // console log to check
    console.log(`Router: zoomid = ${zoomId}`);
    console.log(`Router: data = ${data}`);

    // Call the registerBootcamperAttendance function from the controller
    const register = await attendanceController.registerBootcamperAttendance(
      zoomId,
      data,
      testQuery
    );

    // If the registration fails, return a 404 response
    if (!register) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "ZoomId not found" } });
    }

    // Return a success response
    res.status(200).json({ status: "success", data: register });
  } catch (error) {
    // Handle errors and return a 500 response
    console.error("Error in registerBootcamperAttendance:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

// test

// http://localhost:3000/api/database/attendanceRoutes

// need to break this into seperate files to use the routing function
