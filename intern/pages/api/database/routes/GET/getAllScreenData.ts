// import block
import { NextApiRequest, NextApiResponse } from 'next';
import * as engagementController from '../../controllers/engagementController';

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

    const weekNumber = Number(req.query.weeknumber)

    // Call the getBootcampers function from the controller
    const engagementCardData = await engagementController.getAllScreenData(testQuery, weekNumber);
    res.status(200).json({ status: 'success', data: engagementCardData });
    } catch (error) {

    // Handle errors here
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }