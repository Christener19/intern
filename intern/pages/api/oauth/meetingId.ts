import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API route started.");
  
    // Extract the code from the query parameters
    const { code } = req.query;
  
    // Check if the code is a string
    if (typeof code !== "string") {
      res.status(400).json({ error: "Invalid authorization code." });
      return;
    }
  
    try {
      // Your Zoom credentials
      const zoomClientId = process.env.ZOOM_CLIENT_ID;
      const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET;
      const zoomAccountId = process.env.ZOOM_ACCOUNT_ID;
      const meetingId = process.env.MEETING_ID; // Ensure MEETING_ID is set in your environment
  
      // Encode your credentials
      const base64Credentials = Buffer.from(
        `${zoomClientId}:${zoomClientSecret}`
      ).toString("base64");
  
      // Prepare the request for getting the access token
      const tokenResponse = await fetch(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${base64Credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code,
            grant_type: "authorization_code",
          }),
        }
      );
  
      // Check if the request was successful
      if (!tokenResponse.ok) {
        throw new Error("Failed to fetch access token");
      }
  
      // Extract the access token from the response
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      console.log("Received access token:", accessToken);
  
      // Prepare the request for getting meeting participants
      const participantsResponse = await fetch(
        `https://api.zoom.us/v2/report/meetings/${meetingId}/participants`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      // Check if the request was successful
      if (!participantsResponse.ok) {
        throw new Error("Failed to fetch meeting participants");
      }
  
      // Extract the participants data from the response
      const participantsData = await participantsResponse.json();
      console.log("Meeting Participants:", participantsData);
  
      // Send the participants data in the response
      res.status(200).json({ success: true, participants: participantsData });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }


//http://localhost:3000/api/oauth/meetingId?code=