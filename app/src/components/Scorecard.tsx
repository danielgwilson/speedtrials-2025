"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Scorecard({ pwsid }: { pwsid: string }) {
  const [scorecard, setScorecard] = useState<any>(null);

  useEffect(() => {
    if (pwsid) {
      fetch(`/api/v1/systems/${pwsid}/scorecard`)
        .then((res) => res.json())
        .then((data) => {
          setScorecard(data);
        });
    }
  }, [pwsid]);

  if (!scorecard) {
    return <div>Loading...</div>;
  }

  const getScoreColor = () => {
    if (scorecard.score === "Green") {
      return "bg-green-500";
    }
    if (scorecard.score === "Yellow") {
      return "bg-yellow-500";
    }
    if (scorecard.score === "Red") {
      return "bg-red-500";
    }
    return "bg-gray-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Quality Scorecard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full ${getScoreColor()}`}
          ></div>
          <div className="ml-4">
            <p className="text-lg font-bold">{scorecard.score}</p>
            <p>{scorecard.summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
