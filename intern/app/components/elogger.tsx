//title egagement logger
//div search bar
//div componate container  this can be state
//new componant .map people cards  (back button)
//back download CSV button
//scroll auto
//div form
// if card clicked profile appers
import React from "react";
import EngagementLoggerBox from "./eloggerBox";

export default function EngagementLogger({ engagementData }: any) {
  console.log('rendering EngagementLogger')
  console.log(engagementData)
  return (
    <div>
      <h1>Engagement Logger</h1>
      <div>
        <input placeholder="Search" />
      </div>
      <div>
        <EngagementLoggerBox EngagementInfo={engagementData} />
      </div>
      <div>
        <button>Download CSV</button>
      </div>
    </div>
  );
}
