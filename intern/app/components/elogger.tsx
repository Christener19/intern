"use client";
//title egagement logger
//div search bar
//div componate container  this can be state
//new componant .map people cards  (back button)
//back download CSV button
//scroll auto
//div form
// if card clicked profile appersimport React, { useState } from "react";
import { useEffect, useState } from "react";
import EngagementLoggerBox from "./eloggerBox";
import ButtonEngagementCSV from "./buttonEngagmentLoggerCSV";
import { createEngagementProps } from "../dataObjectsForCompProps/engagementLoggerPipeline";

// EngagmentData interface for type safety
interface EngagementData {
  name: string;
  avgEngagement: string;
  image: null;
  fullData: {};
}

// Define the EngagementLogger component
export default function EngagementLogger() {
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to manage engagmentProps
  const [engagementProps, setEngagementProps] = useState<any[]>([]);
  // explicitly declare engagementProps as any as the promise does resolve to allow filter to work.
  // State to track whether data is being fetched
  const [loading, setLoading] = useState(true);

  // to get the engagementProps
  const fetchData = async (weekNumber: number) => {
    setLoading(true); // Set loading to true before fetching
    try {
      const data = await createEngagementProps(weekNumber);
      setEngagementProps(data as EngagementData[]);
    } finally {
      setLoading(false); // Set loading to false after fetching, even if there's an error
    }
  };

  // use effect to prevent lots of reloads
  useEffect(() => {
    fetchData(1);
  }, []); // Run the fetchData function only once on component mount

  // Event handler for updating the search term
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // // Filter the engagementData based on the search term
  const filteredData = engagementProps?.filter((person: any) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Return the JSX for the component
  return (
    <div className="rounded-xl border-2 border-blue-500 p-4 w-full h-full">
      {/* Heading */}
      <h1 className=" text-xl text-center w-full font-bold text-blue-700">
        ENGAGEMENT LOGGER
      </h1>

      {/* Search input */}
      <div className="mt-3">
        <input
          className="font-serif w-full border-2 border-blue-400 rounded-lg mt-2 mb-2 pl-2 pr-2"
          type="text"
          placeholder=" Search"
          value={searchTerm}
          onChange={handleSearchChange}
          disabled={loading} // Disable input while loading
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
