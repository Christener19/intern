//import block
import Image from 'next/image'
import AlertBox from './alertBox'
import React from 'react';

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
    export default function AttendanceTracker({attendanceAlert} : any) {
    console.log(`got to attendance tracker`)
    console.log(attendanceAlert)

    const {attPercent, alerts} = attendanceAlert 

    console.log(`attPercent: ${attPercent}`)
    console.log(`alerts: ${alerts}`)


        const attendancePercent = {attPercent}
            return (
            <div className= "text-center w-full grid grid-rows-[auto,1fr] grid-flow-col gap-4  rounded-lg border-2 border-cyan-600 p-4 m-1 ">
                <h1 className= "col-span-2 text-3xl  text-cyan-600 rounded-md h-fit" > Attendance tracking</h1> 
                 {/* // title */}
                <div className= "col-span-1 border-2 rounded-md border-cyan-600"> 
            
                    <h2 className= " text-2xl text-cyan-600"> Todays attendance</h2>
                    <div id='attendance figure' className='rounded-md ml-4 mr-4 mb-b bg-cyan-600'> <p className='text-white text-9xl'>{attendancePercent.attPercent}</p></div>
                    <button className='bg-green-500 rounded-md p-2 m-2 text-white'>Download CSV</button>
                </div>
            {/* // div for attendance
                // title
                // attendance percentage/chart
                // button download csv */}

                <div className= " col-span-1 border-2 border-cyan-600 rounded-md" >
                {/* // div for alerts */}
                    <div className='flex flex-row justify-center'>
                        <h2 className=" text-2xl text-cyan-600 pr-2"> Alerts</h2>
                        <Image
                        src='/alarmbell.svg'
                        width={24}
                        height={24}
                        alt='Alert icon'
                        />
                    </div>
                {/* //div for title
                // div */}
                       <AlertBox  alertInformation={alerts}/> 
                </div>
            </div> 
        )
    }
            
                        
    // This was from line 37 w-full justify-center  ml-auto mr-auto text-center