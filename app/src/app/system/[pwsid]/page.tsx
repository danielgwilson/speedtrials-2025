"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { WaterSystemMap } from "@/components/WaterSystemMap";
import { Scorecard } from "@/components/Scorecard";
import { ContaminantDetails } from "@/components/ContaminantDetails";
import { ViolationHistory } from "@/components/ViolationHistory";

export default function SystemPage() {
  const params = useParams<{ pwsid: string }>();
  const { pwsid } = params;
  const [systemDetails, setSystemDetails] = useState<any>(null);

  useEffect(() => {
    if (pwsid) {
      fetch(`/api/v1/systems/${pwsid}/details`)
        .then((res) => res.json())
        .then((data) => {
          setSystemDetails(data);
        });
    }
  }, [pwsid]);

  if (!systemDetails) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center mb-10">
        {systemDetails.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        <div>
          <WaterSystemMap systems={[systemDetails]} onSelectSystem={() => {}} />
        </div>
        <div>
          <Scorecard pwsid={systemDetails.pwsid} />
        </div>
      </div>
      <div className="mt-10 w-full max-w-6xl">
        <ContaminantDetails data={systemDetails.contaminantData} />
      </div>
      <div className="mt-10 w-full max-w-6xl">
        <ViolationHistory data={systemDetails.violationHistory} />
      </div>
    </main>
  );
}
