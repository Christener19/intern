"use client";
import React from "react";
import { zoomPollData } from "@/app/dummData/zoomPollData";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register the category scale
ChartJS.register(CategoryScale, LinearScale, BarElement);

// console.log(zoomPollData[0].questions[0].question_details[0].answer);
console.log(zoomPollData.length);

let good = 0;
let neutral = 0;
let bad = 0;

// function countPollAnswers(answer) {
//   zoomPollData.map((answer)=> (zoomPollData[0].questions[0].question_details[0].answer))
// }

function countPollAnswers(zoomPollData: any) {
  let good = 0;
  let neutral = 0;
  let bad = 0;
  for (let i = 0; i < zoomPollData.length; i++) {
    if (zoomPollData[i].questions[0].question_details[0].answer === "Good") {
      good++;
    }
    if (zoomPollData[i].questions[0].question_details[0].answer === "Bad") {
      bad++;
    }
    if (zoomPollData[i].questions[0].question_details[0].answer === "Neutral") {
      neutral++;
    }
  }
  return { good, neutral, bad };
}

console.log(countPollAnswers(zoomPollData));
let data: data = countPollAnswers(zoomPollData);
interface data {
  good: number;
  neutral: number;
  bad: number;
}

console.log(Object.values(data));

type ZoomPollsProps = {
  // Define props here if necessary
};

const chartData = {
  labels: Object.keys(data),
  datasets: [{ label: "Thermometer", data: Object.values(data) }],
};

// const chartData = {
//   labels: dummyData.map((data: DataItem) => data.name), // Labels are names from dummyData
//   datasets: [
//     {
//       label: data.keys(),
//       data: Object.values(data),
//       backgroundColor: "rgba(255, 99, 132, 0.5)", // Color for age bars
//     },
//   ],
// };

function ZoomPolls(props: ZoomPollsProps) {
  const barStyle = (color: string, height: string) =>
    `w-1/5 h-${height} bg-${color} transition-height duration-300 ease-in-out`;

  return (
    <div className="border-2 border-blue-500 p-4 bg-white rounded-xl max-w-xs mx-auto shadow-sm">
      <div className="text-center text-xl text-blue-500 font-bold mb-4">
        <h2>ZOOM POLLS</h2>
      </div>
      <div className="bg-gray-200 p-4 flex justify-around items-end h-40 rounded-xl">
        <Bar data={chartData} />
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-green-500 text-white py-2 px-4 border-none cursor-pointer rounded-xl shadow-sm uppercase font-bold">
          Thermometer
        </button>
      </div>
    </div>
  );
}

export default ZoomPolls;
