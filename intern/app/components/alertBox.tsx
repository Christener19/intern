import uuid from 'react-uuid'; 
import AlertEntry from './alertEntry'; 

export default function AlertBox({ alertInformation }) {
  return (
    // create alerts for every alert in the array
    <>
    {alertInformation ? 
      {alertInformation.map((alert) => (
        <AlertEntry key={uuid()} infoalert={alert} />
      ))} 
      : null}
    </>
  );
}
