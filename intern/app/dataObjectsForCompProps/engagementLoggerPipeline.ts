// import block
import { mainRoute, getRoute, patchRoute } from "@/utils/APIRouteSetter";
const baseURL = mainRoute()

// This updates the data that feeds the engagement logger cards

// GET the data points from the database
await async function allScreenDataFetcher(weekNumber: number) {
    
    // Freq Screen Switch for all as an array
    // Total screen share for all as an array
    const allScreenData = await fetch(`${baseURL}${getRoute}getAllScreenData?=`)
    // clean up response json


;
} 

// Start loop to go thru every bootcamper in the database
    // Calc the values
        // Polls
        // Freq screen Share
        // Total screen share


    // PATCH the Average engagment value
    
