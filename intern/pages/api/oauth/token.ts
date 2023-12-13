import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("API route started.");

  const { code } = req.query;

  try {
    if (typeof code !== "string") {
      res.status(400).json({ error: "Invalid authorization code." });
      return;
    }

    console.log("Received authorization code:", code);

    const zoomClientId = process.env.ZOOM_CLIENT_ID!;
    const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET!;
    const zoomAccountId = process.env.ZOOM_ACCOUNT_ID!;

    const base64Credentials = Buffer.from(
      `${zoomClientId}:${zoomClientSecret}`
    ).toString("base64");

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
          client_id: zoomClientId,
          client_secret: zoomClientSecret,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to fetch access token");
    }

    const tokenData = await tokenResponse.json();
    console.log("Received access token:", tokenData.access_token);

    res
      .status(200)
      .json({ success: true, accessToken: tokenData.access_token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//http://localhost:3000/api/oauth/token?code=
