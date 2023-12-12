import axios, { AxiosResponse, AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('API route started.');

    const { code } = req.query;

    try {
        if (typeof code !== 'string') {
            throw new Error('Invalid authorization code.');
        }

        const zoomClientId = process.env.ZOOM_CLIENT_ID!;
        const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET!;
        const zoomAccountId = process.env.ZOOM_ACCOUNT_ID!;
        const meetingId = process.env.MEETING_ID!;  // Ensure MEETING_ID is set in your environment

        const base64Credentials = Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString('base64');

        const headersList = {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const bodyParams = new URLSearchParams({
            code,
            grant_type: 'authorization_code',
            client_id: zoomClientId,
            client_secret: zoomClientSecret,
        }).toString();

        const tokenResponse: AxiosResponse<ZoomTokenResponse> = await axios.post(
          `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
            bodyParams,
            { headers: headersList }
        );

        const accessToken = tokenResponse.data.access_token;
        console.log('Received access token:', accessToken);

        // Fetch meeting participants
        const participantsResponse = await axios.get(`https://api.zoom.us/v2/report/meetings/${meetingId}/participants`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        console.log('Meeting Participants:', participantsResponse.data);
        res.status(200).json({ success: true, participants: participantsResponse.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

interface ZoomTokenResponse {
    access_token: string;
}




// http://localhost:3000/api/oauth/callback?code=eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjFmNGEyMzIxLTYyYjctNDk1OC1hYzE3LTc4MmFhZDVmZjY0ZSJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJwU3haSmtLTFE3QzhmQVE1RlNTMWhBIiwidmVyIjo5LCJhdWlkIjoiNmQ4NTZjZDM3NGM3ZjhkM2VkNjU1MjcxMDNkMjljZjUiLCJuYmYiOjE3MDIzMTI0NTQsImNvZGUiOiI0eUpLMlFoVFR4Nl9kcHAyeUIzblNBNDIyTUxkeGNtSWUiLCJpc3MiOiJ6bTpjaWQ6b2xnWjNRZHhUT2V4MU5SdDFqbFZBdyIsImdubyI6MCwiZXhwIjoxNzAyMzE2MDU0LCJ0eXBlIjozLCJpYXQiOjE3MDIzMTI0NTQsImFpZCI6IkpFVjlJNnBYU1Y2VVRjbURsbDB2VUEifQ.AfkW12XsyvjOcOYmiWD33DWFurRR3B3ILDwjIYmg_6lupsiwo4hiA1KKe9RqQlaU1u2Jc9jRwAfSw6iWK2kDJA