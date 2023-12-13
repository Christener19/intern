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

    // check if it's a test (default to true)
    const testQuery: boolean = req.query.testCheck !== null && req.query.testCheck !== undefined;

    // Call the getAbsentBootcampers function from the controller
    const todaysRegister = await attendanceController.getAbsentBootcampers(testQuery);
    res.status(200).json({ status: 'success', data: todaysRegister });
    } catch (error) {
    console.error('Error in getAbsentBootcampers:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}



// test

// http://localhost:3000/api/database/attendanceRoutes

// need to break this into seperate files to use the routing function
