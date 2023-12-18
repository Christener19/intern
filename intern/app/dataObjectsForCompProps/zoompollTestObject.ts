import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// Function to fetch Zoom poll results
export const fetchZoomPollResults = async (zoomPollID: any, testQuery = true) => {
    const baseURL = mainRoute();
    const url = `${baseURL}${getRoute}getZoomPollResults?zoomPollId=${zoomPollID}&testCheck=${testQuery}`;

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
        return pollResults.data;
    } catch (error) {
        console.error('Error fetching Zoom poll results:', error);
        return null; 
    }
};
