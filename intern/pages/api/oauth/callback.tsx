import axios, { AxiosResponse } from 'axios'; // Import Axios and AxiosResponse
import { getSession } from 'next-auth/react';
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
    console.log('Received authorization code:', code);
    // Create headers for the Axios request
    const headersList = {
      'Host': 'zoom.us',
      'Authorization': 'Basic b2xnWjNRZHhUT2V4MU5SdDFqbFZBdzpmbmg1ZjgyVlhjSUJEUGxBemZQSjJHVmdvSFQ3TWtsYg==',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    // Check if code is defined before using it in the parameters
    if (typeof code === 'string') {
      // Use Axios for the request
      const response: AxiosResponse = await axios.post(
        'https://zoom.us/oauth/token?grant_type=account_credentials&account_id=ENTER ACCOUNT ID FROM ZOOM MARKET PLACE',
        new URLSearchParams({
          code,
          grant_type: 'authorization_code',
          redirect_uri: 'https://intern-soc.vercel.app/',
          client_id: 'ENTER CLIENT ID',
          client_secret: 'ENTER CLIENT SECRET',
        }),
        { headers: headersList }
      );
      // Retrieve the JSON data from the Axios response
      const responseData = response.data;
      console.log('Received access token:', responseData.access_token);
      // Store the access token securely, for example, in a session
      // const session = (await getSession({ req })) as CustomSession;
      // // Check if the session object exists
      // if (session) {
      //   // Store the access token in the session
      //   session.accessToken = responseData.access_token;
      //   console.log('Stored access token in session:', session.accessToken);
      // } else {
      //   console.warn('Session object not found.');
      // }
      res.status(200).json({ success: true, payload: responseData });
    } else {
      console.error('Invalid authorization code:', code);
      res.status(400).json({ success: false, error: 'Invalid authorization code' });
    }
  } catch (error) {
    console.error('Error exchanging Zoom authorization code for access token:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};