import uuid from 'react-uuid'; 

export default function AlertBox({ alertInformation }) {
  return (
    // create alerts for every alert in the array
    <>
      {alertInformation.map((alert) => (
        <AlertEntry key={uuid()} infoalert={alert} />
      ))}
    </>
  );
}
