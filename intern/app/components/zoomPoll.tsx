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
import { fetchZoomPollResults } from "../dataObjectsForCompProps/zoompollTestObject";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type ZoomPollsProps = {
  zoomPollData?: { good: number; average: number; poor: number };
};

const ZoomPolls: React.FC<ZoomPollsProps> = ({ zoomPollData }) => {
  const [pollResults, setPollResults] = useState({
    good: 0,
    average: 0,
    poor: 0,
  });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (zoomPollData) {
      setPollResults({
        good: zoomPollData.good,
        average: zoomPollData.average,
        poor: zoomPollData.poor,
      });
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  }, [zoomPollData]);

  // Function to fetch data
  const fetchData = async () => {
    const data = await fetchZoomPollResults(); // Replace with your actual fetch call
    setPollResults(data);
  };

  const handleButtonClick = () => {
    setShowResults(!showResults);

    if (!showResults) {
      // Start fetching data every 10 seconds
      const interval = setInterval(fetchData, 10000);

      // Stop fetching after 3 minutes
      setTimeout(() => clearInterval(interval), 180000);
    }
  };

  const chartData = {
    labels: ["Good", "Average", "Poor"],
    datasets: [
      {
        label: "Thermometer",
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
      <div className="bg-gray-200 p-4 flex justify-around items-end h-52 rounded-xl">
        {showResults ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="text-center w-full text-black mb-20 uppercase font-semibold">
            NO RESULTS
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 border-none cursor-pointer rounded-xl shadow-sm uppercase font-bold mt-4"
          onClick={handleButtonClick}
        >
          Thermometer
        </button>
      </div>
    </div>
  );
};

export default ZoomPolls;
