
import React from 'react';

export default function AlertEntry({ infoalert } : any) {
    // destructure for use in component
    // console.log('infoalert', infoalert);  // debug logger
    const { name, alertLevel } = infoalert;


    console.log(`name: ${name} alertlevel: ${alertLevel}`); // debug logger


    // set alert level
    let alertEmoji : string | null;
    alertEmoji = null;


  switch (alertLevel) {
    case 0:
      // no alert
      break;
    case 1:
      // level 1 - 1/2 day missing alert
      alertEmoji = "⚠️";
      break;
    case 2:
      // level 2 - full day missing alert
      alertEmoji = "⚠️⚠️📧";
      break;
    case 3:
      // level 3 - 1.5 day missing alert
      alertEmoji = "⚠️⚠️⚠️📧";
      break;
    default:
      // level 4 2 day missing alert
      alertEmoji = "⚠️⚠️⚠️⚠️📧‼️";
      break;
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        {/* boot camper name */}
        <p>{name}</p>
        {/* alert level */}
        <p>{alertEmoji}</p>
      </div>
    </>
  );
}

// Removed form line 35 className="flex flex-row text-lg"
