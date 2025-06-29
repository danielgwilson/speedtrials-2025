import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { pwsid: string } }
) {
  const pwsid = params.pwsid;

  // Mock data
  const mockDetails = {
    id: 1,
    pwsid: "GA0010000",
    name: "ATLANTA WATER SYSTEM",
    county: "FULTON",
    populationServed: 1200000,
    serviceConnections: 400000,
    primarySource: "Surface water",
    violationHistory: [],
    contaminantData: [],
  };

  if (pwsid === "GA0020000") {
    mockDetails.id = 2;
    mockDetails.pwsid = "GA0020000";
    mockDetails.name = "SAVANNAH WATER SYSTEM";
    mockDetails.county = "CHATHAM";
    mockDetails.populationServed = 250000;
    mockDetails.serviceConnections = 90000;
    mockDetails.violationHistory = [
      {
        violationId: "12345",
        violationCode: "1100",
        compliancePeriodBegin: "2024-01-01",
        compliancePeriodEnd: "2024-03-31",
        isHealthBased: false,
      },
    ];
  }

  return NextResponse.json(mockDetails);
}