// import block
import { mainRoute, getRoute } from "../../utils/APIRouteSetter";
const baseURL = mainRoute()
import findBreakPoints from "../../utils/engagementAlgo/findBreakPoints";
import findMedian from '../../utils/engagementAlgo/findMedian'

// This updates the data that feeds the engagement logger cards

// GET the data points from the database
async function allScreenDataFetcher(weekNumber: number) {

    // debug loggers
    // console.log(weekNumber)
    // console.log(`allScreen URL: ${baseURL}${getRoute}getAllScreenData?weeknumber=${weekNumber}`)
    // console.log(`allBootcampers URL: ${baseURL}${getRoute}getAllScreenData?weeknumber=${weekNumber}`)

    // Freq Screen Switch for all as an array
    // Total screen share for all as an array
    console.log('getting all screen data')
    const allScreenData = await fetch(`${baseURL}${getRoute}getAllScreenData?weeknumber=${weekNumber}`)
    // clean up response json
    // interface screenData {
    //     allScreenTime: {screen_share_time: number}[]
    //     allScreenSwitch: {screen_share_switch_freq: number}[]
    // }
    const allScreenDataJSON = await allScreenData.text();
    const allScreenDataClean = JSON.parse(allScreenDataJSON)
    const allScreenDataPayload = allScreenDataClean.data.data
    // console.log(allScreenDataPayload) // debug logger

    // deconstruct json object into the two arrays
    const allScreenTimeArr: number[] = allScreenDataPayload.allScreenTime.map(singleValue => singleValue['screen_share_time'])
    const allScreenSwitchArr: number[] = allScreenDataPayload.allScreenSwitch.map(singleValue => 
    singleValue['screen_share_switch_freq'])
    // debug loggers
    // console.log('allScreenTimeArr')
    // console.log(allScreenTimeArr)
    // console.log('allScreenSwitchArr')
    // console.log(allScreenSwitchArr)

    // Calculate median for each
    const screenShareMedian = findMedian(allScreenTimeArr)
    const screenSwitchMedian = findMedian(allScreenSwitchArr)
    // debug loggers
    // console.log(`screenShareMedian: ${screenShareMedian}`)
    // console.log(`screenSwitchMedian: ${screenSwitchMedian}`)

    // Calculate the breakpoints () from the medians
    const screenShareBreakPoint = findBreakPoints(0.15, 0.3, screenShareMedian)
    const screenSwitchFreqBreakPoint = findBreakPoints(0.2, 0.4, screenSwitchMedian)
    // debug loggers
    // console.log(`screenShareBreakPoint`)
    // console.log(screenShareBreakPoint)
    // console.log(`screenSwitchFreqBreakPoint}`)
    // console.log(screenSwitchFreqBreakPoint)

    // get all bootcampers and clean up into array of objects
    const allBootcampers = await fetch(`${baseURL}${getRoute}getBootcampersForEngagement?weeknumber=${weekNumber}`)
    interface bootcamperData {
        screenShareTotal: number,
        screenSwitchFreqTotal: number,
        pollCompletionRate: number,
        zoomID:number
    }
    const allBootcampersJSON = await allBootcampers.text();
    const allBootcampersArr = JSON.parse(allBootcampersJSON);
    const allBootcampersPayload = allBootcampersArr.data.data
    console.log('bootcamperArr check')
    //console.log(allBootcampersPayload);
    // restructure it into the right format
    const bootcampers: bootcamperData = allBootcampersPayload.map(entry => ({
        zoomID: Number(entry.zoomid),
        screenShareTotal: Number(entry.screen_share_time),
        screenSwitchTotal: Number(entry.screen_share_switch_freq),
        pollCompletionRate: Number(entry.poll_completion_rate)
    }));

    console.log(bootcampers)
    // Create return object
    return {
        // array of objects of each bootcamper {id, screenshareData, screenSwitchData, pollCompletionRate}
        bootcampers,
        // breakpoints {ScreenShare, ScreenSwitch}
        breakpoints: {
            screenShareBreakPoint,
            screenSwitchFreqBreakPoint
        }
    }
} ;

allScreenDataFetcher(1)

// Start loop to go thru every bootcamper in the database
async function allEngagementGradePatcher(screenShareMedians: object ) {

    // Calc the values
        // Polls
        // Freq screen Share
        // Total screen share


    // PATCH the Average engagment value
}
    
