import { mainRoute, getRoute } from "@/utils/APIRouteSetter";
import { ParticipantNamesResponse } from "../components/randomNamePicker";

// Function to fetch participant names for the random name picker
export const fetchParticipantNames =
  async (): Promise<ParticipantNamesResponse> => {
    const baseURL = mainRoute();

    // Construct the URL for the API call
    const url = `${baseURL}${getRoute}getParticipantList`;

    // Log the URL to the console
    console.log("Requesting URL:", url);

    try {
      // Fetch data from the 'getParticipantList' API route
      const participantResponse = await fetch(url);
      // const participantResponse = await fetch(`${baseURL}${getRoute}getParticipantList`);

      if (!participantResponse.ok) {
        throw new Error(`HTTP error! status: ${participantResponse.status}`);
      }

      const contentType = participantResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Not a JSON response");
      }

      const participantData = await participantResponse.json();

      const names = participantData.data.map((item: any) => item.name);

      return { names };
    } catch (error) {
      console.error("Error fetching participant names:", error);
      return { names: [] };
    }
  };
