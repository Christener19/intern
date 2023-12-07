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
    <div>
      {/* Heading */}
      <h1>Engagement Logger</h1>

      {/* Search input */}
      <div>
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
      <div>
        <button>Download CSV</button>
      </div>
    </div>
  );
}
