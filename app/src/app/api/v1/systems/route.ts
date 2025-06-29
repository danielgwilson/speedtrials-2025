import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Address parameter is missing" },
      { status: 400 }
    );
  }

  // Mock data
  const mockSystems = [
    {
      id: 1,
      pwsid: "GA0010000",
      name: "ATLANTA WATER SYSTEM",
      county: "FULTON",
      populationServed: 1200000,
      serviceConnections: 400000,
      primarySource: "Surface water",
    },
    {
      id: 2,
      pwsid: "GA0020000",
      name: "SAVANNAH WATER SYSTEM",
      county: "CHATHAM",
      populationServed: 250000,
      serviceConnections: 90000,
      primarySource: "Surface water",
    },
  ];

  return NextResponse.json(mockSystems);
}