// import block
import { NextApiRequest, NextApiResponse } from "next";
import * as attendanceController from "../../controllers/attendanceController";

// Main API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Handle GET request
  if (method === "GET") {
    return handleGetRequest(req, res);
  }

  // If the method is not allowed, set the appropriate headers and status
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}

// Function to handle GET request
async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const zoomid = String(req.query.zoomid);

    // check if it's a test (default to true)
    const testQuery: boolean =
      req.query.testCheck !== null && req.query.testCheck !== undefined;

    // Call the getBootcampers function from the controller
    const bootcamper = await attendanceController.getBootcamperById(
      testQuery,
      zoomid
    );
    res.status(200).json({ status: "success", data: bootcamper });
  } catch (error) {
    console.error("Error in getBootcampers:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

// test

// http://localhost:3000/api/database/routes/GET/getBootcamperById?zoomid=123

// need to break this into seperate files to use the routing function
