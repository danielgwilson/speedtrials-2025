import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { pwsid: string } }
) {
  const pwsid = params.pwsid;

  // Mock data
  const mockScorecard = {
    score: "Green",
    summary: "No recent violations",
    recentViolations: 0,
  };

  if (pwsid === "GA0020000") {
    mockScorecard.score = "Yellow";
    mockScorecard.summary = "1 non-health-based violation in the last year.";
    mockScorecard.recentViolations = 1;
  }

  return NextResponse.json(mockScorecard);
}