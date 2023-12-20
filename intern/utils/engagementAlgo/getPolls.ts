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
export default function getPolls(zoomID: number, pollCompletionRate:number): number {
  console.log(`Getting poll score for ${zoomID}`);
  let score = 0;
  // Get call to look at Zoom poll completion rate (poll-completion rate)
  // fetch

  //let completetionPercentage = 0.74; // hard code for testing

  switch (true) {
    case pollCompletionRate >= 0.9:
      score = 3;
      break;
    case pollCompletionRate <= 0.89 && pollCompletionRate >= 0.75:
      score = 2;
      break;
    default:
      score = 1;
  }

  console.log(`${zoomID} poll score = ${score}`);
  // Switch:
  // >90% = 3 pts
  // >=75-89 = 2 pts
  // <=74 = 1 pt
  return score;
}

// getPolls(698); // manual test statment
