"use client";
//function returns a card fr every person
// contain whole view is sub componate
// card = props object to desturcture
//average engagament status
//name
//image/avatar
//full data = objects -history
//pass to sub show status
import { useState, useEffect } from "react";
import Image from "next/image";

export default function EngagementLoggerCard({ cardObject }: any) {
  // console.log("rendering card");
  // console.log(cardObject);

  const [bgColor, setbgColor] = useState("bg-white-400");

  const { name, avgEngagement, image, fullData } = cardObject;

  useEffect(() => {
    switch (avgEngagement) {
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
  }, [avgEngagement]);

  // conditionally render image
  const imageNotNullChecker = () => {
    if (image) {
      return (
        <Image
          src={image}
          height={64}
          width={64}
          alt={`profile image for ${name}`}
        />
      );
    } else {
      return (
        <Image
          src="/defaultUserImage.svg"
          height={64}
          width={64}
          alt="default profile image"
        />
      );
    }
  };

  return (
    <div className={`${bgColor} rounded-lg`}>
      <div className="mt-3">
        <div className="CardContent flex p-2">
          {imageNotNullChecker()}
          <div className="cardTextContent flex flex-col justify-between pl-4">
            <p className="font-sans">{name}</p>
            <p className="font-serif">Average Engagement: {avgEngagement}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
