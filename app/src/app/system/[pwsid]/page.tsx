import { getScorecardData } from '@/app/actions';
import { Scorecard } from '@/components/ui/Scorecard';
import { ViolationHistory } from '@/components/ui/ViolationHistory';

export default async function SystemPage({ params }: { params: { pwsid: string } }) {
  const scorecardData = await getScorecardData(params.pwsid);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{scorecardData.systemName}</h1>
      <p className="text-lg text-gray-600">{scorecardData.pwsid}</p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Water Quality Scorecard</h2>
          <Scorecard score={scorecardData.score} summary={scorecardData.summary} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Violation History</h2>
          <ViolationHistory violations={scorecardData.violations} />
        </div>
      </div>
    </div>
  );
}
