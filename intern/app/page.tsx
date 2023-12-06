/////// THIS IS THE DASHBOARD/MAIN HOMEPAGE //////////
// import block
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import  AttendanceTracker  from "./components/attendance";
// utitly function for authentication check

// test import for comp data
import { testAttendanceData } from './demoObjects/attendancetrackerObject';

export default async function Index() {
  // checking if the user is logged in
  const supabase = createServerComponentClient({cookies});
  const {data: {session},} = await supabase.auth.getSession();
  // if not go to login page
  if (!session) {
    console.log('unauth user redirect to login')
    redirect('/login');
  }

  return (
    // adding redirects to either dashboard or login page depending on user status
    <section className="flex-1 w-full flex flex-col gap-20 items-center">
        < AttendanceTracker attendanceAlert={testAttendanceData} />
        {/* < EngagementLogger /> */}
        {/* < ZoomPolls /> */}
        {/* < RandomNamePicker /> */}
    
    </section>
  );
}
