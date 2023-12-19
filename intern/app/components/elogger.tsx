"use client";
//title egagement logger
//div search bar
//div componate container  this can be state
//new componant .map people cards  (back button)
//back download CSV button
//scroll auto
//div form
// if card clicked profile appersimport React, { useState } from "react";
import EngagementLoggerBox from "./eloggerBox";
import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonEngagementCSV from "./buttonEngagmentLoggerCSV";
import createEngagementProps from "../dataObjectsForCompProps/eloggerHydration";

// Define the EngagementLogger component
export default function EngagementLogger() {
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to manage engagmentProps
  const [engagmentProps, setEngagementProps] = useState([
    {
      name: "Loading",
      avgEngagement: "good",
      image: null,
      fullData: {},
    },
  ]);
  const [dataLoaded, setDataLoaded] = useState(true);

  const fetchData = async () => {
    const data = await createEngagementProps(1);

    // Push to database
    console.log("fetchData function");
    setDataLoaded(dataLoaded ? false : true);
  };
  setInterval(fetchData, 60 * 1000);

  // // [{ name: "Alice", avgEngagement: "average", image: null, fullData: {} }],

  // useEffect to track changes and re-render component(s)
  useEffect(() => {
    console.log("dataLoaded");
    // Updates EngagementProps
    setEngagementProps([
      {
        name: "Thomas",
        avgEngagement: "average",
        image: null,
        fullData: {},
      },
    ]);
  }, [dataLoaded]);

  // Event handler for updating the search term
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter the engagementData based on the search term
  const filteredData = engagmentProps?.filter((person: any) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Return the JSX for the component
  return (
    <div className="rounded-xl border-2 border-blue-500 p-4 w-full h-full">
      {/* Heading */}
      <h1 className=" text-xl text-center w-full font-bold text-blue-500">
        ENGAGEMENT LOGGER
      </h1>

      {/* Search input */}
      <div className="mt-3">
        <input
          className="w-full border-2 border-blue-400 rounded-lg mt-2 mb-2 pl-2 pr-2"
          type="text"
          placeholder=" Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* EngagementLoggerBox component with filtered data */}
      <div>
        <EngagementLoggerBox EngagementInfo={filteredData} />
      </div>

      {/* Download CSV button */}
      <div className="w-full flex justify-items-center mt-8 ">
        <ButtonEngagementCSV></ButtonEngagementCSV>
      </div>
    </div>
  );
}
