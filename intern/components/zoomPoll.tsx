"use client";
import React from "react";

type ZoomPollsProps = {
  // Define props here if necessary
};

function ZoomPolls(props: ZoomPollsProps) {
  const barStyle = (color: string, height: string) =>
    `w-1/5 h-${height} bg-${color} transition-height duration-300 ease-in-out`;

  return (
    <div className="border-2 border-blue-500 p-4 bg-white rounded-xl max-w-xs mx-auto shadow-sm">
      <div className="text-center text-xl text-blue-500 font-bold mb-4">
        <h2>ZOOM POLLS</h2>
      </div>
      <div className="bg-gray-200 p-4 flex justify-around items-end h-40 rounded-xl">
        <div className={barStyle("green", "full")}></div> {/* Green bar */}
        <div className={barStyle("orange", "1/2")}></div> {/* Orange bar */}
        <div className={barStyle("blue", "3/4")}></div> {/* Blue bar */}
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
