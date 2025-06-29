import { db } from '../src/db/db';
import { waterSystems, violations, lcrSamples, mcls } from '../src/db/schema';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

async function main() {
  // Clear all tables
  await db.delete(lcrSamples);
  await db.delete(violations);
  await db.delete(waterSystems);
  await db.delete(mcls);
  console.log('Cleared all tables');

  const dataDir = path.join(process.cwd(), '..', 'data');

  // Seed Water Systems
  const waterSystemsCsv = fs.readFileSync(
    path.join(dataDir, 'SDWA_PUB_WATER_SYSTEMS.csv'),
    'utf-8'
  );
  const waterSystemsData = parse(waterSystemsCsv, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const row of waterSystemsData) {
    await db.insert(waterSystems).values({
      pwsid: row.PWSID,
      name: row.PWS_NAME,
      county: row.COUNTY_SERVED,
      populationServed: parseInt(row.POPULATION_SERVED_COUNT, 10),
      serviceConnections: parseInt(row.SERVICE_CONNECTIONS_COUNT, 10),
      primarySource: row.PRIMARY_SOURCE_CODE,
    });
  }
  console.log('Seeded water systems');

  // Seed Violations
  const violationsCsv = fs.readFileSync(
    path.join(dataDir, 'SDWA_VIOLATIONS_ENFORCEMENT.csv'),
    'utf-8'
  );
  const violationsData = parse(violationsCsv, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const row of violationsData) {
    const compliancePeriodBegin = new Date(row.COMPLIANCE_PERIOD_BEGIN_DATE);
    const compliancePeriodEnd = new Date(row.COMPLIANCE_PERIOD_END_DATE);

    if (
      isNaN(compliancePeriodBegin.getTime()) ||
      isNaN(compliancePeriodEnd.getTime())
    ) {
      console.log(`Skipping violation with invalid date: ${row.VIOLATION_ID}`);
      continue;
    }

    await db.insert(violations).values({
      pwsid: row.PWSID,
      violationId: row.VIOLATION_ID,
      compliancePeriodBegin,
      compliancePeriodEnd,
      violationCode: row.VIOLATION_CODE,
      isHealthBased: row.IS_HEALTH_BASED_IND === 'Y',
      contaminantCode: row.CONTAMINANT_CODE,
    });
  }
  console.log('Seeded violations');

  // Seed LCR Samples
  const lcrSamplesCsv = fs.readFileSync(
    path.join(dataDir, 'SDWA_LCR_SAMPLES.csv'),
    'utf-8'
  );
  const lcrSamplesData = parse(lcrSamplesCsv, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const row of lcrSamplesData) {
    const samplingEndDate = new Date(row.SAMPLING_END_DATE);

    if (isNaN(samplingEndDate.getTime())) {
      console.log(`Skipping LCR sample with invalid date: ${row.SAMPLE_ID}`);
      continue;
    }

    await db.insert(lcrSamples).values([
      {
        pwsid: row.PWSID,
        sampleId: row.SAMPLE_ID,
        samplingEndDate,
        contaminantCode: row.CONTAMINANT_CODE,
        sampleMeasure: parseFloat(row.SAMPLE_MEASURE),
        unitOfMeasure: row.UNIT_OF_MEASURE,
      },
    ]);
  }
  console.log('Seeded LCR samples');

  // Seed MCLs
  const mclsCsv = fs.readFileSync(path.join(dataDir, 'EPA_MCLS.csv'), 'utf-8');
  const mclsData = parse(mclsCsv, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const row of mclsData) {
    await db.insert(mcls).values({
      contaminant: row.Contaminant,
      mclg: row.MCLG,
      mcl: row.MCL,
      healthEffects: row.HealthEffects,
      source: row.Source,
    });
  }
  console.log('Seeded MCLs');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
