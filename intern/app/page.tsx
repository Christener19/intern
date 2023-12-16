/////// THIS IS THE DASHBOARD/MAIN HOMEPAGE //////////
// import block
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AttendanceTracker from "./components/attendance";

import EngagementLogger from "./components/elogger";

import NamePicker from "./components/randomNamePicker";
import { Montserrat } from "next/font/google";
import ZoomPolls from "./components/zoomPoll";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// utitly function for authentication check

// test import for comp data
import { attendanceDataFetcher } from "./dataObjectsForCompProps/attendanceTrackerTestObject";
import { testEngagementData } from "./demoObjects/engagementLoggerData";


export default async function Index() {
  // checking if the user is logged in
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // if not go to login page
  if (!session) {
    console.log("unauth user redirect to login");
    redirect("/login");
  }

  // test att percent prop
  const attendanceData = await attendanceDataFetcher()
  console.log(`attendanceData`)
  console.log(attendanceData)

  return (
    // adding redirects to either dashboard or login page depending on user status
    <section className="grid grid-cols-3 grid-rows-2 gap-2 p-2 w-full max-w-screen-trueHD trueHD:ml-auto trueHD:mr-auto">
      <div className="col-span-2">
        {" "}
        <AttendanceTracker attendanceAlert={attendanceData} />
      </div>
      <div className="row-span-2 col-start-3 row-start-1">
        {" "}
        <EngagementLogger engagementData={testEngagementData} />
      </div>
      <div className="col-start-1 row-start-2">
        {" "}
        <ZoomPolls />
      </div>
      <div className="col-start-2 row-start-2">
        {" "}
        <NamePicker />
      </div>
    </section>
  );
}


