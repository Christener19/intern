"use client"
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { fetchZoomPollResults } from "../dataObjectsForCompProps/zoompollTestObject";

// Register the category scale
ChartJS.register(CategoryScale, LinearScale, BarElement);

type ZoomPollsProps = {
  zoomPollID: number; 
};

const ZoomPolls: React.FC<ZoomPollsProps> = ({ zoomPollID }) => {
  const [pollResults, setPollResults] = useState({ good: 0, average: 0, poor: 0 });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchZoomPollResults(zoomPollID);
      if (results) {
        setPollResults(results); // Set the fetched results
      }
    };

    fetchData();
  }, [zoomPollID]); // Dependency array includes zoomPollID

  const chartData = {
    labels: Object.keys(pollResults),
    datasets: [
      {
        label: "Thermometer",
        data: Object.values(pollResults),
        backgroundColor: ["green", "blue", "red"],
      },
    ],
  };

  return (
    <div className="border-2 border-blue-500 p-4 rounded-xl shadow-sm w-full h-full mt-1 mr-2">
      <div className="text-center text-xl text-blue-500 font-bold mb-4">
        <h2>ZOOM POLLS</h2>
      </div>
      <div className="bg-gray-200 p-4 flex justify-around items-end h-52 rounded-xl">
        {showResults ? (
          <Bar data={chartData} />
        ) : (
          <div className="text-center w-full text-black mb-20 uppercase font-semibold">
            No results
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 border-none cursor-pointer rounded-xl shadow-sm uppercase font-bold mt-4"
          onClick={() => setShowResults(!showResults)} // Toggle the showResults state
        >
          Thermometer
        </button>
      </div>
    </div>
  );
};

export default ZoomPolls;




// // console.log(zoomPollData[0].questions[0].question_details[0].answer);

// let good = 0;
// let neutral = 0;
// let bad = 0;

// // function countPollAnswers(answer) {
// //   zoomPollData.map((answer)=> (zoomPollData[0].questions[0].question_details[0].answer))
// // }

// function countPollAnswers(zoomPollData: any) {
//   let good = 0;
//   let neutral = 0;
//   let bad = 0;
//   for (let i = 0; i < zoomPollData.length; i++) {
//     if (zoomPollData[i].questions[0].question_details[0].answer === "Good") {
//       good++;
//     }
//     if (zoomPollData[i].questions[0].question_details[0].answer === "Bad") {
//       bad++;
//     }
//     if (zoomPollData[i].questions[0].question_details[0].answer === "Neutral") {
//       neutral++;
//     }
//   }
//   return { good, neutral, bad };
// }

// let thermometerData: data = countPollAnswers(zoomPollData);
// interface data {
//   good: number;
//   neutral: number;
//   bad: number;
// }

// console.log(Object.values(thermometerData));

// type ZoomPollsProps = {
//   // Define props here if necessary
// };

// const chartData = {
//   labels: Object.keys(thermometerData),
//   datasets: [
//     {
//       label: "Thermometer",
//       data: Object.values(thermometerData),
//       backgroundColor: ["green", "blue", "red"],
//     },
//   ],
// };

// const ZoomPolls: React.FC<ZoomPollsProps> = (props) => {
//   const [showResults, setShowResults] = useState(false);

//   return (
//     <div className="border-2 border-blue-500 p-4 rounded-xl shadow-sm w-full h-full mt-1 mr-2">
//       <div className="text-center text-xl text-blue-500 font-bold mb-4">
//         <h2>ZOOM POLLS</h2>
//       </div>
//       <div className="bg-gray-200 p-4 flex justify-around items-end h-52 rounded-xl">
//         {showResults ? (
//           <Bar data={chartData} />
//         ) : (
//           <div className="text-center w-full text-black mb-20 uppercase font-semibold">
//             No results
//           </div>
//         )}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 border-none cursor-pointer rounded-xl shadow-sm uppercase font-bold mt-4"
//           onClick={() => setShowResults(!showResults)} // Toggle the showResults state
//         >
//           Thermometer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ZoomPolls;
