// import block
import { NextApiRequest, NextApiResponse } from 'next';
import * as attendanceController from '../../controllers/attendanceController';

// Main API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Handle GET request
  if (method === 'GET') {
    return handleGetRequest(req, res);
  }

  // If the method is not allowed, set the appropriate headers and status
  res.setHeader('Allow', ['GET']);
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



// test

// http://localhost:3000/api/database/attendanceRoutes

// need to break this into seperate files to use the routing function
