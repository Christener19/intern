// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   console.log('API route started.');

//   const { code, action } = req.query;

//   try {
//     if (typeof code !== 'string') {
//       res.status(400).json({ error: 'Invalid authorization code.' });
//       return;
//     }

//     const zoomClientId = process.env.ZOOM_CLIENT_ID!;
//     const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET!;
//     const zoomAccountId = process.env.ZOOM_ACCOUNT_ID!;
//     const meetingId = process.env.MEETING_ID!;

//     const base64Credentials = Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString('base64');

//     const tokenResponse = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`, {
//       method: "POST",
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         code,
//         grant_type: 'authorization_code',
//       })
//     });

//     if (!tokenResponse.ok) {
//       throw new Error('Failed to fetch access token');
//     }

//     const tokenData = await tokenResponse.json();
//     const accessToken = tokenData.access_token;

//     if (action === 'createPoll') {
//       // Logic for creating a poll
//       const pollData = {
//         // Define your poll data here
//       };

//       const createPollResponse = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}/polls`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(pollData),
//       });

//       if (!createPollResponse.ok) {
//         throw new Error('Failed to create poll');
//       }

//       const createPollData = await createPollResponse.json();
//       console.log('Poll created:', createPollData);

//       res.status(200).json({ success: true, poll: createPollData });
//       return;
//     } else {
//       // Logic for fetching existing polls
//       const pollsResponse = await fetch(`https://api.zoom.us/v2/report/meetings/${meetingId}/polls`, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       });

//       if (!pollsResponse.ok) {
//         throw new Error('Failed to fetch meeting polls');
//       }

//       const pollsData = await pollsResponse.json();
//       console.log('Polls response:', pollsData);

//       res.status(200).json({ success: true, polls: pollsData });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

