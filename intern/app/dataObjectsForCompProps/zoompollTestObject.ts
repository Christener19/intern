import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// Function to fetch Zoom poll results
export const fetchZoomPollResults = async (zoomPollID?: number) => {
    const baseURL = mainRoute();
    let url = `${baseURL}${getRoute}getZoomPollResults`;

    // Append zoomPollID to the URL only if it's provided
    if (zoomPollID !== undefined) {
        url += `?zoomPollId=${zoomPollID}`;
    }
    console.log("Requesting URL:", url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const pollResults = await response.json();

        // Ensure that pollResults has a data property and it's an array
        if (pollResults && Array.isArray(pollResults.data) && pollResults.data.length > 0) {
            return pollResults.data[0]; // Return the first element of the data array
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        console.error('Error fetching Zoom poll results:', error);
        return null; 
    }
};

