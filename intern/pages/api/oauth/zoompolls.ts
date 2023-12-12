import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API route started.');

  const { code } = req.query;

  try {
    if (typeof code !== 'string') {
      res.status(400).json({ error: 'Invalid authorization code.' });
      return;
    }

    const zoomClientId = process.env.ZOOM_CLIENT_ID!;
    const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET!;
    const zoomAccountId = process.env.ZOOM_ACCOUNT_ID!;
    const meetingId = process.env.MEETING_ID; 

    const base64Credentials = Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString('base64');

    const tokenResponse = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`, {
      method: "POST",
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const pollsResponse = await fetch(`https://api.zoom.us/v2/report/meetings/${meetingId}/polls`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!pollsResponse.ok) {
      throw new Error('Failed to fetch meeting polls');
    }

    const pollsData = await pollsResponse.json();
    console.log('Polls response:', pollsData);

    res.status(200).json({ success: true, polls: pollsData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

//http://localhost:3000/api/oauth/zoompolls?code=