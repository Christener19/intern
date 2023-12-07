"use client";
import React, { useState } from "react";
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

let thermometerData: data = countPollAnswers(zoomPollData);
interface data {
  good: number;
  neutral: number;
  bad: number;
}

console.log(Object.values(thermometerData));

type ZoomPollsProps = {
  // Define props here if necessary
};

const chartData = {
  labels: Object.keys(thermometerData),
  datasets: [{ label: "Thermometer", data: Object.values(thermometerData) }],
};

const ZoomPolls: React.FC<ZoomPollsProps> = (props) => {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="border-2 border-blue-500 p-4 rounded-xl shadow-sm w-full h-full">
      <div className="text-center text-xl text-blue-500 font-bold mb-4">
        <h2>ZOOM POLLS</h2>
      </div>
      <div className="bg-gray-200 p-4 flex justify-around items-end h-56 rounded-xl">
        {showResults ? (
          <Bar data={chartData} />
        ) : (
          <div className="text-center w-full">No results</div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 text-white py-2 px-4 border-none cursor-pointer rounded-xl shadow-sm uppercase font-bold"
          onClick={() => setShowResults(!showResults)} // Toggle the showResults state
        >
          Thermometer
        </button>
      </div>
    </div>
  );
};

export default ZoomPolls;
