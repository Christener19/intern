// Plan
// getScoreForBootcamper  function to manage all scoring and returning of engagement data

// getScoreForBootcamper func take ? argument (ZoomID)

// Polls data
// return the score

// Total screen time
// return the score

// Freq of screen switch
// return the score

// Switch? or of statement

// if score is =< 8
// return Good

// if score is < 6
// return Average

// else (score is lower than 6)
// return Poor

// Function code

//import block
import getPolls from "./getPolls";
import getTotalScreenShare from "./getTotalScreenShare";
import getFreqScreenSwitch from "./getFreqScreenSwitch";

function getScoreForBootcamper(zoomID : number) : string {
  let total =
    getPolls(zoomID) +
    getFreqScreenSwitch(zoomID) +
    getTotalScreenShare(zoomID);
let grade = ''

    switch(true) {
        // good
        case (total >= 8):
            grade = 'good';
            break;
        // average
        case (total < 8 && total >= 6):
            grade = 'average';
            break;
        // poor
        default:
            grade = 'poor';
            break;
    }

    return grade
}
