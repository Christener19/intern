"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const hardcodedData = [
  { good: 1, average: 5, poor: 10 },
  { good: 10, average: 2, poor: 7 },
  { good: 8, average: 3, poor: 10 },
  { good: 4, average: 10, poor: 9 },
  { good: 5, average: 7, poor: 10 },
  { good: 3, average: 10, poor: 2 },
  { good: 7, average: 10, poor: 9 },
  { good: 6, average: 1, poor: 10 },
  { good: 1, average: 3, poor: 10 },
  { good: 6, average: 10, poor: 1 },
];

const ZoomPolls: React.FC = () => {
  const [pollResults, setPollResults] = useState({
    good: 0,
    average: 0,
    poor: 0,
  });
  const [dataIndex, setDataIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPollResults(hardcodedData[dataIndex]);
  }, [dataIndex]);

  const fetchData = () => {
    setDataIndex((prevIndex) => (prevIndex + 1) % hardcodedData.length);
  };

  const handleButtonClick = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(fetchData, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const chartData = {
    labels: ["Good", "Average", "Poor"],
    datasets: [
      {
        label: "Poll Results",
        data: [pollResults.good, pollResults.average, pollResults.poor],
        backgroundColor: ["#4ADE80", "#FACC15", "#F87171"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20, // Legend font size
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 16,
          family: "Arial, sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "Arial, sans-serif",
        },
        cornerRadius: 4,
        displayColors: true,
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 20, // X-axis labels font size
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 16, // Y-axis labels font size
          },
        },
      },
    },
  };

  return (
    <div className="border-2 border-blue-500 p-4 rounded-xl shadow-sm w-full h-full mt-1 mr-2">
      <div className="text-center text-xl text-blue-500 font-bold mb-4">
        <h2>ZOOM POLLS</h2>
      </div>
      <div
        className="bg-gray-200 p-4 flex justify-around items-end h-52 rounded-xl"
        data-testid="zoom-poll-chart"
      >
        <Bar data={chartData} options={options} />
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 border-none cursor-pointer rounded-xl shadow-sm uppercase font-bold mt-4"
          onClick={handleButtonClick}
        >
          {intervalId ? "Stop Refresh" : "Thumbmometer"}
        </button>
      </div>
    </div>
  );
};

export default ZoomPolls;
// code conected to SQL database test table -------------------------------------------------------------------------------------------
// "use client";
// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
// } from "chart.js";
// import { fetchZoomPollResults } from "../dataObjectsForCompProps/zoompollTestObject";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// type ZoomPollsProps = {
//   zoomPollData?: { good: number; average: number; poor: number };
// };

// const ZoomPolls: React.FC<ZoomPollsProps> = ({ zoomPollData }) => {
//   const [pollResults, setPollResults] = useState({
//     good: 0,
//     average: 0,
//     poor: 0,
//   });
//   const [showResults, setShowResults] = useState(false);

//   useEffect(() => {
//     if (zoomPollData) {
//       setPollResults({
//         good: zoomPollData.good,
//         average: zoomPollData.average,
//         poor: zoomPollData.poor,
//       });
//       setShowResults(false);
//     } else {
//       setShowResults(true);
//     }
//   }, [zoomPollData]);

//   // Function to fetch data
//   const fetchData = async () => {
//     const data = await fetchZoomPollResults(); // Replace with your actual fetch call
//     setPollResults(data);
//   };

//   const handleButtonClick = () => {
//     setShowResults(!showResults);

//     if (!showResults) {
//       // Start fetching data every 10 seconds
//       const interval = setInterval(fetchData, 10000);

//       // Stop fetching after 3 minutes
//       setTimeout(() => clearInterval(interval), 180000);
//     }
//   };
//   // Function to calculate the delay for each bar
//   const barDelay = (context) => {
//     const index = context.dataIndex;
//     // 10 seconds delay progressively for each bar
//     return index * 7000;
//   };

//   const chartData = {
//     labels: ["Good", "Average", "Poor"],
//     datasets: [
//       {
//         label: "Thermometer",
//         data: [pollResults.good, pollResults.average, pollResults.poor],
//         backgroundColor: ["#4ADE80", "#FACC15", "#F87171"],
//         borderRadius: 8,
//       },
//     ],
//   };

//   const options = {
//     animation: {
//       delay: barDelay, // Set the delay function for the animation
//     },
//     plugins: {
//       legend: {
//         labels: {
//           font: {
//             size: 20, // Legend font size
//           },
//         },
//       },
//       tooltip: {
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         titleFont: {
//           size: 16,
//           family: "Arial, sans-serif",
//         },
//         bodyFont: {
//           size: 14,
//           family: "Arial, sans-serif",
//         },
//         cornerRadius: 4,
//         displayColors: true,
//         mode: "index" as const,
//         intersect: false,
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           font: {
//             size: 20, // X-axis labels font size
//           },
//         },
//       },
//       y: {
//         ticks: {
//           font: {
//             size: 16, // Y-axis labels font size
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="border-2 border-blue-500 p-4 rounded-xl shadow-sm w-full h-full mt-1 mr-2">
//       <div className="text-center text-xl text-blue-500 font-bold mb-4">
//         <h2>ZOOM POLLS</h2>
//       </div>
//       <div
//         className="bg-gray-200 p-4 flex justify-around items-end h-52 rounded-xl"
//         data-testid="zoom-poll-chart"
//       >
//         {showResults ? (
//           <Bar data={chartData} options={options} />
//         ) : (
//           <div className="text-center w-full text-black mb-20 uppercase font-semibold">
//             NO RESULTS
//           </div>
//         )}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 border-none cursor-pointer rounded-xl shadow-sm uppercase font-bold mt-4"
//           onClick={handleButtonClick}
//         >
//           Thermometer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ZoomPolls;
