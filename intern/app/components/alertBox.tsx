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
    <>
      {alertInformation.map((alert) => (
        <AlertEntry key={uuid()} infoalert={alert} />
      ))} 
    </>
  );
      }
}
