// import block
import { NextApiRequest, NextApiResponse } from 'next';
import * as attendanceController from './controllers/attendanceController';

// Main API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Handle GET request
  if (method === 'GET') {
    return handleGetRequest(req, res);
  }

  // Handle PATCH request
  if (method === 'PATCH') {
    return handlePatchRequest(req, res);
  }

  // If the method is not allowed, set the appropriate headers and status
  res.setHeader('Allow', ['GET', 'PATCH']);
  res.status(405).end(`Method ${method} Not Allowed`);
}

// Function to handle GET request
async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Call the getBootcampers function from the controller
    const todaysAttendance = await attendanceController.getBootcampers();
    res.status(200).json({ status: 'success', data: todaysAttendance });
  } catch (error) {
    console.error('Error in getBootcampers:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}

// Function to handle PATCH request
async function handlePatchRequest(req: any, res: NextApiResponse) {
  try {
    // Extract parameters from the request
    const zoomId = req.query.id
    const data = req.body;


    // Call the registerBootcamperAttendance function from the controller
    const register = await attendanceController.registerBootcamperAttendance(zoomId, data);

    // If the registration fails, return a 404 response
    if (!register) {
      return res.status(404).json({ status: 'fail', data: { msg: 'ZoomId not found' } });
    }

    // Return a success response
    res.status(200).json({ status: 'success', data: register });
  } catch (error) {
    // Handle errors and return a 500 response
    console.error('Error in registerBootcamperAttendance:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}
