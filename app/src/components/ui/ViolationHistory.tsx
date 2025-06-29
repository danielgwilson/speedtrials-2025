import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineBody,
} from '@/components/ui/timeline'; // Assuming a timeline component exists

interface ViolationHistoryProps {
  violations: any[];
}

export function ViolationHistory({ violations }: ViolationHistoryProps) {
  return (
    <Timeline>
      {violations.map((violation) => (
        <TimelineItem key={violation.violationId}>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className={violation.isHealthBased ? 'bg-red-500' : 'bg-yellow-500'} />
            <TimelineTitle>{violation.violationCode}</TimelineTitle>
          </TimelineHeader>
          <TimelineBody>
            <p>
              From {new Date(violation.nonComplianceBeginDate).toLocaleDateString()} to{' '}
              {new Date(violation.nonComplianceEndDate).toLocaleDateString()}
            </p>
            <p>{violation.contaminantCode}</p>
          </TimelineBody>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
