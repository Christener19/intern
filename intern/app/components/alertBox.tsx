import uuid from 'react-uuid'; 
import AlertEntry from './alertEntry'; 

export default function AlertBox({ alertInformation = null}) {
  
  // if alert info is null return nothing (blank state is good as no alerts)
  if (alertInformation === null) {
    return (
      null
    )
  } else {
  return (
    // create alerts for every alert in the array
    <div className='rounded-md border-2 border-cyan-600 ml-4 mr-4 mb-4 h-48 box-border'>
      {alertInformation.map((alert) => (
        <AlertEntry key={uuid()} infoalert={alert} />
      ))} 
    </div>
  );
      }
}
