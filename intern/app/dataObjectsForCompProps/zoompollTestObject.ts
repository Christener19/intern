import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// Function to fetch Zoom poll results
export const fetchZoomPollResults = async (zoomPollID?: number) => {
    const baseURL = mainRoute();
    let url = `${baseURL}${getRoute}getZoomPollResults`;

    // Append zoomPollID to the URL only if it's provided
    if (zoomPollID !== undefined) {   url += `?zoomPollId=${zoomPollID}`;
    }
    console.log("Requesting URL:", url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const pollResults = await response.json();
        console.log("API Response:", pollResults); // Log the API response

        // Adjust this check according to the new response format
        if (pollResults && pollResults.status === 'success' && pollResults.data) {
            return pollResults.data; // Directly return the data object
        } else {
            // Handle the case where data is empty or not as expected
            console.warn('API returned success but no data:', pollResults);
            return null; // Return null or a default value
        }
    } catch (error) {
        console.error('Error fetching Zoom poll results:', error);
        return null;
    }
};


