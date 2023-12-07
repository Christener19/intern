"use client";
//function returns a card fr every person
// contain whole view is sub componate
// card = props object to desturcture
//average engagament status
//name
//image/avatar
//full data = objects -history
//pass to sub show statusimport React, { useState, useEffect } from "react";
import {useState, useEffect} from "react";
export default function EngagementLoggerCard({ cardObject }: any) {
  console.log("rendering card");
  console.log(cardObject);

  const [bgColor, setbgColor] = useState("bg-white-400");

  useEffect(() => {
    switch (cardObject.avgEngagement) {
      case "good":
        setbgColor("bg-green-400");
        break;
      case "poor":
        setbgColor("bg-red-400");
        break;
      default:
        setbgColor("bg-yellow-400");
        break;
    }
  }, [cardObject.avgEngagement]);

  const { name } = cardObject;

  return (
    <div className={bgColor}>
      <div className="CardContent">
        {/* <Image src={image} height={64} width={64} alt={`profile picture for ${name}`} /> */}
        <div className="cardTextContent">
          <p>{name}</p>
          <p>Average Engagement: {cardObject.avgEngagement}</p>
        </div>
      </div>
    </div>
  );
}
