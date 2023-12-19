// import block
import { NextApiRequest, NextApiResponse } from 'next';
import * as namePickerController from '../../controllers/namePickerController';

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


    const testQuery: boolean = req.query.testCheck !== null && req.query.testCheck !== undefined;
    
    // Call the getBootcampers function from the controller
    const nameList = await namePickerController.getParticpantsList(testQuery);
    res.status(200).json({ status: 'success', data: nameList });
  } 
  catch (error) {
    console.error('Error in getParticpantsList:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }

}



// test

// http://localhost:3000/api/database/attendanceRoutes

// need to break this into seperate files to use the routing function
