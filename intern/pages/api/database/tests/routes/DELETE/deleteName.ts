// import block
import { NextApiRequest, NextApiResponse } from 'next';
import * as name_picker from '../../controllers/namePickerController';

// Main API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Handle GET request
  if (method === 'DELETE') {
    return handleDeleteRequest(req, res);
  }


  // If the method is not allowed, set the appropriate headers and status
  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
}

// Function to handle GET request
async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const zoomId = Number(req.query.zoomId)
    
    // check if it's a test (default to true)
    const testQuery: boolean = req.query.testCheck !== null && req.query.testCheck !== undefined;

    // Call the function from the controller
    const screenShareFreq = await name_picker.deleteName(zoomId, testQuery)
    res.status(200).json({ status: 'success', data: screenShareFreq });
  } catch (error) {
    console.error('Error in deleteName Route:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}
