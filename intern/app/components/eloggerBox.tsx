import { v4 as uuidv4 } from 'uuid';
import EngagementLogger from './elogger';
import EngagementLoggerCard from './Engagementlogger';

export default function EngagementLoggerBox({ EngagementInfo }: { EngagementInfo: object[] | null }) {
  if (!EngagementInfo) {
    return null;
  } else {
    return (
      <div>
        {EngagementInfo.map((loggerPersonal: any) => (
          <EngagementLoggerCard key={uuidv4()} info={loggerPersonal} />
        ))}
      </div>
    );
  }
}
