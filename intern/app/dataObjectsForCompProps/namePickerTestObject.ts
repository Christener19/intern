import { mainRoute, getRoute } from "@/utils/APIRouteSetter";
import { ParticipantNamesResponse } from "../components/randomNamePicker";

// Function to fetch participant names for the random name picker
export const fetchParticipantNames = async (): Promise<ParticipantNamesResponse> => {
    const baseURL = mainRoute();

    try {
        // Fetch data from the 'getParticipantList' API route
        const participantResponse = await fetch(`${baseURL}${getRoute}getParticipantList`);

        if (!participantResponse.ok) {
            throw new Error(`HTTP error! status: ${participantResponse.status}`);
        }

        const contentType = participantResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Not a JSON response");
        }

 
        const participantText = await participantResponse.text();
        const participantData = JSON.parse(participantText);

        const names = participantData.data.map(item => item.name);

        return { names };
    } catch (error) {
        console.error('Error fetching participant names:', error);
        return { names: [] }; 
    }
};
