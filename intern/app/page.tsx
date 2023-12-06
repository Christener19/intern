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
    <section className="border-red-500 grid grid-cols-3 grid-rows-2 gap-2">
      <div className=""> {/*< AttendanceTracker /> */}</div>
      <div> {/* < EngagementLogger /> */}</div>
      <div> {/* < ZoomPolls /> */}</div>
      <div>
        {" "}
        <NamePicker />
      </div>
    </section>
  );
}
