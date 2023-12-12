import axios, { AxiosResponse, AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// Declare a custom type extending Session
interface CustomSession {
  user: {
    name?: string;
    email?: string;
  };
  accessToken?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API route started.');

  const { code } = req.query;

  try {
    if (typeof code !== 'string') {
      throw new Error('Invalid authorization code.');
    }

    console.log('Received authorization code:', code);

    const zoomClientId = process.env.ZOOM_CLIENT_ID!;
    const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET!;
    const zoomAccountId = process.env.ZOOM_ACCOUNT_ID!;

    console.log(`Client ID: ${process.env.ZOOM_CLIENT_ID}`);
console.log(`Client Secret: ${process.env.ZOOM_CLIENT_SECRET}`);

    // Encode client ID and client secret to base64
    const base64Credentials = Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString('base64');

    // Create headers for the Axios request
    const headersList = {
      'Host': 'zoom.us',
      'Authorization': `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    // Convert the parameters to a URL-encoded string
    const bodyParams = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: zoomClientId,
      client_secret: zoomClientSecret,
    }).toString();

    console.log('Request parameters:', bodyParams);

    interface ZoomTokenResponse {
        access_token: string;
      }
      

    // Use Axios for the request
      const response: AxiosResponse<ZoomTokenResponse> = await axios.post(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
        bodyParams,
        { headers: headersList }
      );


    // Log the entire response
    console.log('Zoom API Response:', response.data);

    // Retrieve the JSON data from the Axios response
    const responseData = response.data;
    console.log('Received access token:', responseData.access_token);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error exchanging Zoom authorization code for access token:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorResponse = axiosError.response;

      if (errorResponse?.status === 400) {
        res.status(400).json({ success: false, error: 'Invalid authorization code' });
      } else {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    } else {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
};




//http://localhost:3000/api/oauth/callback?code=