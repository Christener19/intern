import uuid from 'react-uuid';
import AlertEntry from './alertEntry';
import React from 'react';

export default function AlertBox({ alertInformation }: { alertInformation: object[] | null }) {

  // if alert info is null or empty return nothing (blank state is good as no alerts)
  if (!alertInformation) {
    return null;
  } else {
    return (
      // create alerts for every alert in the array

      <div className='rounded-md border-2 border-cyan-600 ml-4 mr-4 mb-4 h-48 box-border'>
   {alertInformation.map((alert: any) => (

          <AlertEntry key={uuid()} infoalert={alert} />
        ))}
      </div>
    );
  }
}

