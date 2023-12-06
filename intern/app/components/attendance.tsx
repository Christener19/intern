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
    console.log(`got to attendance tracker`)
    console.log(attendanceAlert)

    const {attPercent, alerts} = attendanceAlert 

    console.log(`attPercent: ${attPercent}`)
    console.log(`alerts: ${alerts}`)


        const attendancePercent = {attPercent}
            return (
            <div className= " w-full justify-center  ml-auto mr-auto text-center grid-rows-2 grid-flow-col gap-4">
                <h1 className= " text-3xl  text-cyan-500 row-span-2 bg-pink-500" > Attendance tracking</h1> 
                 {/* // title */}
                <div className= "border-2 rounded-md bg-yellow-500"> 
            
                    <h2 className= " text-2xl "> Todays attendance</h2>
                    <div> <p>{attendancePercent.attPercent}</p></div>
                    <button> Download CSV</button>
                </div>
            {/* // div for attendance
                // title
                // attendance percentage/chart
                // button download csv */}

                <div className= "bg-green-500" >
                {/* // div for alerts */}
                    <div>
                        <h2 className=" text-2xl"> Alerts</h2>
                        <Image />
                    </div>
                {/* //div for title
                // div */}
                       <AlertBox  alertInformation={alerts}/> 
                    </div>
            </div> 
        )
    }
            
                        
