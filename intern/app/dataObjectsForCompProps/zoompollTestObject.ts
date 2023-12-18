import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// Function to fetch Zoom poll results
export const fetchZoomPollResults = async (zoomPollID: number) => {
    const baseURL = mainRoute();
    const url = `${baseURL}${getRoute}getZoomPollResults?zoomPollId=${zoomPollID}`; //deleted test query 
    console.log("Requesting URL:", url);
    console.log('zoomPollID:', zoomPollID);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Not a JSON response");
        }

        const pollResults = await response.json();

        // Check if the data array is not empty
        if (pollResults.status === 'success' && pollResults.data.length > 0) {
            return pollResults.data[0]; // Return the first element of the data array
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        console.error('Error fetching Zoom poll results:', error);
        return null; 
    }
};

