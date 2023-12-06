//import block
import Image from 'next/image'
import AlertBox from './alertBox'

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
    export default function AttendanceTracker({attendanceAlert}) {
        const attendancePercent = "92%"
            return (
            <div className= " w-full justify-center flex flex-col ml-auto mr-auto text-center">
                <h1 className= " text-3xl  text-cyan-500" > Attendance tracking</h1> 
                 {/* // title */}
                <div className= "border-2 rounded-md"> 
            
                    <h2 className= " text-2xl"> Todays attendance</h2>
                    <div> <p>{attendancePercent}</p></div>
                    <button> Download CSV</button>
                </div>
            {/* // div for attendance
                // title
                // attendance percentage/chart
                // button download csv */}

                <div>
                {/* // div for alerts */}
                    <div>
                        <h2 className=" text-2xl"> Alerts</h2>
                        <Image />
                    </div>
                {/* //div for title
                // div */}
                       <AlertBox  alertInformation={attendanceAlert}/> 
                    </div>
            </div> 
        )
    }
            
                        
