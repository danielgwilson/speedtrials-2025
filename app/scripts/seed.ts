// scripts/seed.ts
import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '..', '.env') });

import { db } from '../src/lib/db';
import { waterSystems, violations, lcrSamples, geographicAreas, mcls } from '../src/lib/db/schema';
import { promises as fs } from 'fs';
import { parse } from 'papaparse';

async function main() {
  console.log('Seeding database...');

  // Helper function to read and parse a CSV file
  const parseCsv = async (filePath: string) => {
    const csvFile = await fs.readFile(filePath, 'utf8');
    return parse(csvFile, { header: true, skipEmptyLines: true }).data;
  };

  // Water Systems
  const waterSystemsData = await parseCsv(join(process.cwd(), 'data', 'SDWA_PUB_WATER_SYSTEMS.csv'));
  await db.insert(waterSystems).values(waterSystemsData.map((row: any) => ({
    pwsid: row.PWSID,
    name: row.PWS_NAME,
    primacyAgencyCode: row.PRIMACY_AGENCY_CODE,
    epaRegion: row.EPA_REGION,
    pwsActivityCode: row.PWS_ACTIVITY_CODE,
    pwsTypeCode: row.PWS_TYPE_CODE,
    ownerTypeCode: row.OWNER_TYPE_CODE,
    populationServedCount: row.POPULATION_SERVED_COUNT ? parseInt(row.POPULATION_SERVED_COUNT) : null,
    serviceConnectionsCount: row.SERVICE_CONNECTIONS_COUNT ? parseInt(row.SERVICE_CONNECTIONS_COUNT) : null,
    primarySourceCode: row.PRIMARY_SOURCE_CODE,
    addressLine1: row.ADDRESS_LINE1,
    addressLine2: row.ADDRESS_LINE2,
    cityName: row.CITY_NAME,
    zipCode: row.ZIP_CODE,
    stateCode: row.STATE_CODE,
  })));

  // Geographic Areas
  const geographicAreasData = await parseCsv(join(process.cwd(), 'data', 'SDWA_GEOGRAPHIC_AREAS.csv'));
  await db.insert(geographicAreas).values(geographicAreasData.map((row: any) => ({
    pwsid: row.PWSID,
    areaTypeCode: row.AREA_TYPE_CODE,
    countyServed: row.COUNTY_SERVED,
    cityServed: row.CITY_SERVED,
    zipCodeServed: row.ZIP_CODE_SERVED,
  })));

  // Violations
  const violationsData = await parseCsv(join(process.cwd(), 'data', 'SDWA_VIOLATIONS_ENFORCEMENT.csv'));
  await db.insert(violations).values(violationsData.map((row: any) => ({
    pwsid: row.PWSID,
    violationId: row.VIOLATION_ID,
    facilityId: row.FACILITY_ID,
    nonComplianceBeginDate: row.NON_COMPL_PER_BEGIN_DATE ? new Date(row.NON_COMPL_PER_BEGIN_DATE) : null,
    nonComplianceEndDate: row.NON_COMPL_PER_END_DATE ? new Date(row.NON_COMPL_PER_END_DATE) : null,
    violationCode: row.VIOLATION_CODE,
    violationCategoryCode: row.VIOLATION_CATEGORY_CODE,
    isHealthBased: row.IS_HEALTH_BASED_IND === 'Y',
    contaminantCode: row.CONTAMINANT_CODE,
    violMeasure: row.VIOL_MEASURE ? parseFloat(row.VIOL_MEASURE) : null,
    unitOfMeasure: row.UNIT_OF_MEASURE,
    federalMcl: row.FEDERAL_MCL,
    isMajorViolation: row.IS_MAJOR_VIOL_IND === 'Y',
    violationStatus: row.VIOLATION_STATUS,
  })));

  // LCR Samples
  const lcrSamplesData = await parseCsv(join(process.cwd(), 'data', 'SDWA_LCR_SAMPLES.csv'));
  await db.insert(lcrSamples).values(lcrSamplesData.map((row: any) => ({
    pwsid: row.PWSID,
    sampleId: row.SAMPLE_ID,
    samplingEndDate: new Date(row.SAMPLING_END_DATE),
    contaminantCode: row.CONTAMINANT_CODE,
    sampleMeasure: parseFloat(row.SAMPLE_MEASURE),
    unitOfMeasure: row.UNIT_OF_MEASURE,
  })));

  // MCLs
  const mclsData = await parseCsv(join(process.cwd(), 'data', 'EPA_MCLS.csv'));
  await db.insert(mcls).values(mclsData.map((row: any) => ({
    contaminantCode: row.ContaminantCode,
    contaminantName: row.Contaminant,
    mcl: row.MCL,
    healthEffects: row.HealthEffects,
    source: row.Source,
  })));

  console.log('Database seeded successfully!');
}

main().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
