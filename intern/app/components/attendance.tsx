//import block
"use client"
import Image from "next/image";
import AlertBox from "./alertBox";
import React from "react";
import ButtonAttendanceCSV from "./buttonAttendanceCSV";
import { useState, useEffect } from "react";  
import { mainRoute, getRoute } from "@/utils/APIRouteSetter";



export default function AttendanceTracker({ attendanceAlert: initialAttendanceAlert }) {
  const [attendanceAlert, setAttendanceAlert] = useState(initialAttendanceAlert);

  const baseURL = mainRoute()

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
   
        const response = await fetch(`${baseURL}${getRoute}getBootcampers`);
        const updatedData = await response.json();
      
        console.log('Updated attendance data:', updatedData);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      }
    };
    fetchAttendanceData();
    const interval = setInterval(fetchAttendanceData, 3600000 ); 
  }, []);



  const { attPercent, alerts } = attendanceAlert;
console.log(`attPercent: ${attPercent}`)
    console.log(`alerts: ${alerts}`) 
  const attendancePercent = { attPercent };
  console.log(`attendancePercent: ${attendancePercent.attPercent}`)



  return (
    <div className="flex flex-col text-center w-full  h-full rounded-xl border-2 border-blue-500 p-4 ">
      <h1 className="w-full text-2xl  text-blue-500 text-center uppercase font-bold rounded-md h-fit">
        {" "}
        Attendance tracking
      </h1>
      {/* // title */}
      <div id='attendance and alert holder' className="flex flex-row box-border">
        <div id='todays attendance div' className="mr-2 w-1/2 border-2 rounded-xl border-blue-500">
          <h2 className=" text-xl text-blue-500 uppercase font-bold m-3">
            {" "}
            Todays attendance
          </h2>
          <div
            id="attendance figure"
            className="rounded-xl ml-4 mr-4 mb-b bg-blue-500"
          >
            {" "}
            <p className="text-white text-9xl">{attendancePercent.attPercent}</p>
        </div>
          <ButtonAttendanceCSV></ButtonAttendanceCSV>
        </div>
      
      {/* // div for attendance
                // title
                // attendance percentage/chart
                // button download csv */}

      <div id='alerts div' className=" col-span-1 border-2 border-blue-500 rounded-xl w-1/2 ml-2">
        {/* // div for alerts */}
        <div className="flex flex-row justify-center">
          <h2 className="text-xl text-blue-500 mb-3 mt-2 mr-2 font-bold uppercase ">
            {" "}
            Alerts
          </h2>
          <div className="mb-3 mt-3">
          <Image src="/alarmbell.svg" width={20} height={20} alt="Alert icon" />
          </div>
        </div>
        {/* //div for title
                // div */}
        <AlertBox alertInformation={alerts} />
      </div>
      </div>
    </div>
  );
}


