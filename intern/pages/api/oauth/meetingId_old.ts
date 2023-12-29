import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
          include_fields: "registrant_id",
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
      `https://api.zoom.us/v2/report/meetings/${meetingId}/participants?include_fields=registrant_id`,
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
    // console.log("Meeting Participants:", participantsData.participants);

    const registrantIDs = participantsData.participants.map(
      (participant : any) => participant.registrant_id
    );

    const uniqueRegistrantIDs = registrantIDs.filter(function (
      value: any,
      index: any,
      self: any
    ) {
      return self.indexOf(value) === index && value !== undefined;
    });

    interface newParticipantObjType {
      registrant_id: string;
      name: string;
      user_email: string;
      day: string;
      duration: number;
      join_leave: JoinLeaveType[];
    }

    interface JoinLeaveType {
      join: Date;
      leave: Date;
    }

    let newParticipantArr: newParticipantObjType[] = [];
  

    for (let j = 0; j < uniqueRegistrantIDs.length; j++) {
      let duration = 0;
      let newParticipantObj: newParticipantObjType = {
        registrant_id: "",
        name: "",
        user_email: "",
        day: "",
        duration: 0,
        join_leave: [],
      };

      for (let i = 0; i < participantsData.participants.length; i++) {
        if (
          participantsData.participants[i].registrant_id ===
          uniqueRegistrantIDs[j]
        ) {
          duration = duration + participantsData.participants[i].duration;
          newParticipantObj.registrant_id =
            participantsData.participants[i].registrant_id;
          newParticipantObj.name = participantsData.participants[i].name;
          newParticipantObj.user_email =
            participantsData.participants[i].user_email;
          newParticipantObj.day = participantsData.participants[
            i
          ].join_time.slice(0, 11);
          let newJoinLeave = {
            join: participantsData.participants[i].join_time,
            leave: participantsData.participants[i].leave_time,
          };
          newParticipantObj.join_leave.push(newJoinLeave);
        }
        newParticipantObj.duration = duration;
      }
      newParticipantArr.push(newParticipantObj);

      // debug loggers
      // console.log("new Array:", newParticipantArr);
      // console.log("Join_leave Array:");
      // console.log(newParticipantArr[0].join_leave[0]);
      // console.log(newParticipantArr[0].join_leave[1]);
      // console.log(newParticipantArr[0].join_leave[2]);
    }

    // Send the participants data in the response
    res.status(200).json({ success: true, participants: participantsData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

//http://localhost:3000/api/oauth/meetingId?code=
