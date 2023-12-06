export default function AlertEntry({ infoalert }) {
    // destructure for use in component
    console.log('infoalert', infoalert);  
    const { name, alertLevel } = infoalert;

    console.log(`alertlevel: ${alertLevel}`);

    // set alert level
    let alertEmoji = null;

    switch (alertLevel) {
        case 0:
            // no alert
            break;
        case 1:
            // level 1 - 1/2 day missing alert
            alertEmoji = '⚠️';
            break;
        case 2:
            // level 2 - full day missing alert
            alertEmoji = '⚠️⚠️📧';
            break;
        case 3:
            // level 3 - 1.5 day missing alert
            alertEmoji = '⚠️⚠️⚠️📧';
            break;
        default:
            // level 4 2 day missing alert
            alertEmoji = '⚠️⚠️⚠️⚠️📧‼️';
            break;
    }

    return (
        <>
            <div className="flex flex-row text-lg">
                {/* boot camper name */}
                <p>{name}</p>
                {/* alert level */}
                <p>{alertEmoji}</p>
            </div>
        </>
    );
}
