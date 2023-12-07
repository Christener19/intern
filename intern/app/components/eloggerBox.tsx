import { v4 as uuidv4 } from 'uuid';
import EngagementLogger from './elogger';

export default function EngagementLoggerBox({ LoggerInfo }: { LoggerInfo: object[] | null }) {
  if (!LoggerInfo) {
    return null;
  } else {
    return (
      <div>
        {LoggerInfo.map((loggerPersonal: any) => (
          <EngagementLogger key={uuidv4()} info={loggerPersonal} />
        ))}
      </div>
    );
  }
}
