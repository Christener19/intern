'use client';
//title egagement logger
//div search bar
//div componate container  this can be state
//new componant .map people cards  (back button)
//back download CSV button
//scroll auto
//div form
// if card clicked profile appersimport React, { useState } from "react";
import EngagementLoggerBox from "./eloggerBox";
import { useState } from "react";

// Define the EngagementLogger component
export default function EngagementLogger({ engagementData }: any) {
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Event handler for updating the search term
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter the engagementData based on the search term
  const filteredData = engagementData?.filter((person: any) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Return the JSX for the component
  return (
    <div className="p-4 ">
      {/* Heading */}
      <h1 className=" text-lg text-center w-full">Engagement Logger</h1>

      {/* Search input */}
      <div className="w-full border-2 border-blue-400 rounded-lg mt-2 mb-2">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* EngagementLoggerBox component with filtered data */}
      <div>
        <EngagementLoggerBox EngagementInfo={filteredData} />
      </div>

      {/* Download CSV button */}
      <div className="w-full flex justify-items-center ">
        <button className="bg-green-500 rounded-lg text-white p-4 mt-2 mr-auto ml-auto ">Download CSV</button>
      </div>
    </div>
  );
}
