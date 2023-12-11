// Plan
// getPolls function will take in ZoomId (?)
// Get call to look at Zoom poll completion rate (poll-completion rate)
// Look up
// Return score (number 1-3)
// Switch:
// >90% = 3 pts
// >=75-89 = 2 pts
// <=74 = 1 pt


// Function code
function getPolls(zoomID : number) {
console.log(`Getting poll score for ${zoomID}`)
let score = 0;
// Get call to look at Zoom poll completion rate (poll-completion rate)
    // fetch

let completetionPercentage = .74

    switch(true) {
        case completetionPercentage >= .9:
            score = 3
            break;
        case completetionPercentage <= .89 && completetionPercentage >= .75:
            score = 2;
            break;
        default:
            score = 1;
    } 

console.log(`${zoomID} poll score = ${score}`)
// Switch:
// >90% = 3 pts
// >=75-89 = 2 pts
// <=74 = 1 pt
}

// getPolls(698); // manual test statment
