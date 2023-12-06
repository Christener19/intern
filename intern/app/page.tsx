/////// THIS IS THE DASHBOARD/MAIN HOMEPAGE //////////
// import block
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NamePicker from "../components/randomNamePicker";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
// utitly function for authentication check

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

  return (
    // adding redirects to either dashboard or login page depending on user status
    <section className="border-red-500 border-2 grid grid-cols-3 grid-rows-2 gap-2">
      <div className="border-green-900 border-2 col-span-2">
        {" "}
        {/*< AttendanceTracker /> */}
      </div>
      <div className="border-yellow-700 border-2 row-span-2 col-start-3 row-start-1">
        {" "}
        {/* < EngagementLogger /> */}
      </div>
      <div className="border-blue-950 border-2 col-start-1 row-start-2">
        {" "}
        {/* < ZoomPolls /> */}
      </div>
      <div className="border-pink-950 border-2 col-start-2 row-start-2">
        {" "}
        <NamePicker />
      </div>
    </section>
  );
}
