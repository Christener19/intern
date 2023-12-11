export default function findBreakPoints(
  good: number,
  average: number,
  median: number
) {
  // Good break point = median * good = 4.5 * 0.85 = 3.825
  // Average break point = median * average = 4.5 * 0.70 = 3.15
  // Poor (default).
  return {
    goodBP: Number((median * (1 - good)).toFixed(3)),
    averageBP: Number((median * (1 - average)).toFixed(3)),
  };
}

// console.log(findBreakPoints(0.15, 0.3, 4.5)); // test logger
