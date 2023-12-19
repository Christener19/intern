// import block
import { mainRoute, getRoute } from "@/utils/APIRouteSetter";
const mainUrl = mainRoute()
// Function provides data props to be used in elogger react component

// Data provided in this shape (example):
  // [{ name: "Alice", avgEngagement: "average", image: null, fullData: {} }],
    export default async function engagementDataResponse (weekNumber:number) {
      await fetch(
        `${mainUrl}${getRoute}getEngagementScoreByWeek?weekNumber=${weekNumber}`
      );
      const engagementDataJSON = await engagementDataResponse.text();
      const engagementDataPayload = JSON.parse(engagementDataJSON);
      const engagementDataArray = engagementDataPayload.data;
      const engagementData = engagementDataArray.map((entry) => ({
        name: entry.name,
        avgEngagement: entry.average_engagement_grade,
        image: null,
        fullData: {},
      }));
      return engagementData;
    };