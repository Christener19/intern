//import block
import Image from 'next/image'

///////////////Attendance tracking page//////////////

// div to hold everything
// title

// div for attendance
    // title
    // attendance percentage/chart
    // button download csv


// div for alerts
    //div for title
    //div for alerts
        // div
            //title
            //alert icon
        // alert box    
            
    // div to hold everything
    export default function AttendanceTracker() {
            return (
            <div>
                <h1> Attendance tracking</h1> 
                 {/* // title */}
                <div> 
                    <h2> Todays attendance</h2>
                    <div> <p>22%</p></div>
                    <button> Download CSV</button>
                </div>
            {/* // div for attendance
                // title
                // attendance percentage/chart
                // button download csv */}

                <div>
                {/* // div for alerts */}
                    <div>
                        <h2> Alerts</h2>
                        <Image />
                    </div>
                {/* //div for title
                // div */}
                <div id="alertbox">

                </div>
                    
                    </div> 
            </div> 
        )
    }
            
                        
