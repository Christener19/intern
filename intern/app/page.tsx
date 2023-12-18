import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AttendanceTracker from "./components/attendance";
import EngagementLogger from "./components/elogger";
import NamePicker from "./components/randomNamePicker";
import { Montserrat } from "next/font/google";
import ZoomPolls from "./components/zoomPoll";

import { attendanceDataFetcher } from "./dataObjectsForCompProps/attendanceTrackerTestObject";
import { testEngagementData } from "./demoObjects/engagementLoggerData";
import { fetchZoomPollResults } from "./dataObjectsForCompProps/zoompollTestObject";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    console.log("unauth user redirect to login");
    redirect("/login");
  }

  const attendanceData = await attendanceDataFetcher();
  console.log(`attendanceData`);
  console.log(attendanceData);

  // Fetch the latest Zoom poll data
  const zoomPollData = await fetchZoomPollResults();
  console.log(`zoomPollData`);
  console.log(zoomPollData);

  return (
    <section className="grid grid-cols-3 grid-rows-2 gap-2 p-2 w-full max-w-screen-trueHD trueHD:ml-auto trueHD:mr-auto">
      <div className="col-span-2">
        <AttendanceTracker attendanceAlert={attendanceData} />
      </div>
      <div className="row-span-2 col-start-3 row-start-1">
        <EngagementLogger engagementData={testEngagementData} />
      </div>
      <div className="col-start-1 row-start-2">
        {/* Pass the latest Zoom poll data */}
        <ZoomPolls zoomPollData={zoomPollData} />
      </div>
      <div className="col-start-2 row-start-2">
        <NamePicker />
      </div>
    </section>
  );
}
