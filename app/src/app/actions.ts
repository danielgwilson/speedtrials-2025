'use server';

import { db } from '@/lib/db';
import { waterSystems, violations, geographicAreas } from '@/lib/db/schema';
import { eq, and, like, desc, gte } from 'drizzle-orm';
import { geocodeAddressToCounty } from '@/lib/geo';

// Action to find water systems based on a geographic search
export async function findWaterSystems(query: string) {
  // 1. First, attempt to find a direct match on PWS Name or PWSID
  // 2. If no direct match, assume query is an address or county.
  //    Use a geocoding service to resolve the query to a county name.
  const county = await geocodeAddressToCounty(query);

  const systems = await db
    .select({
      pwsid: waterSystems.pwsid,
      name: waterSystems.name,
      city: waterSystems.cityName,
    })
    .from(waterSystems)
    .leftJoin(geographicAreas, eq(waterSystems.pwsid, geographicAreas.pwsid))
    .where(
        like(geographicAreas.countyServed, `%${county}%`)
    )
    .limit(10);

  return systems;
}

// Action to get the data needed for the "Scorecard"
export async function getScorecardData(pwsid: string) {
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  const recentViolations = await db
    .select()
    .from(violations)
    .where(
      and(
        eq(violations.pwsid, pwsid),
        gte(violations.nonComplianceBeginDate, threeYearsAgo)
      )
    )
    .orderBy(desc(violations.nonComplianceBeginDate));

  // TODO: Add contaminant level checks vs. MCLs

  const score = calculateWaterHealthScore(recentViolations);

  const systemInfo = await db.query.waterSystems.findFirst({
      where: eq(waterSystems.pwsid, pwsid)
  });


  return {
    systemName: systemInfo?.name,
    pwsid: systemInfo?.pwsid,
    score: score.grade, // e.g., 'A', 'B', 'C'
    summary: score.summary,
    violations: recentViolations,
  };
}

// TODO: Define calculateWaterHealthScore algorithm
function calculateWaterHealthScore(recentViolations: any[]) {
    if (recentViolations.length > 0) {
        return {
            grade: 'C',
            summary: 'This system has recent violations.'
        };
    }
    return {
        grade: 'A',
        summary: 'This system has no recent violations.'
    };
}