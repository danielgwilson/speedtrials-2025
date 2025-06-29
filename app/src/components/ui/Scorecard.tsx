import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScorecardProps {
  score: string;
  summary: string;
}

export function Scorecard({ score, summary }: ScorecardProps) {
  const scoreColor =
    score === 'A'
      ? 'bg-green-500'
      : score === 'B'
      ? 'bg-yellow-500'
      : 'bg-red-500';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Water Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className={`h-16 w-16 rounded-full ${scoreColor}`} />
          <div>
            <p className="text-2xl font-bold">{score}</p>
            <p className="text-gray-600">{summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
