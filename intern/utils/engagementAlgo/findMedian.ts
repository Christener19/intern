export default function findMedian(cohortScreenShareArr: number[]) {
  cohortScreenShareArr.sort((a, b) => a - b);
  const middleIndex = Math.floor(cohortScreenShareArr.length / 2);

  if (cohortScreenShareArr.length % 2 === 0) {
    return (
      (cohortScreenShareArr[middleIndex - 1] +
        cohortScreenShareArr[middleIndex]) /
      2
    );
  } else {
    return cohortScreenShareArr[middleIndex];
  }
}
