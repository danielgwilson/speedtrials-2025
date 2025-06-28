import { db, waterSystems, pfasReadings, contaminants, violations, healthAdvisories } from './index';
import type { NewWaterSystem, NewPFASReading, NewContaminant, NewViolation, NewHealthAdvisory } from './schema';

// PFAS hotspot water systems based on research
const hotspotSystems: NewWaterSystem[] = [
  {
    pwsid: 'GA1210000',
    name: 'Calhoun Water System',
    county: 'Gordon',
    city: 'Calhoun',
    state: 'GA',
    zipCode: '30701',
    systemType: 'Community',
    populationServed: 15650,
    primarySourceType: 'Surface water',
    lat: 34.5026,
    lng: -84.9510,
    pfasDetected: 1,
    pfasLevel: 28.5, // 625% over EPA limit
    pfasStatus: 'DANGER',
    lastPFASTest: '2024-12-15',
    remediationStatus: 'in_progress',
    remediationDeadline: '2025-12-31',
  },
  {
    pwsid: 'GA2450000',
    name: 'Augusta Water System',
    county: 'Richmond',
    city: 'Augusta',
    state: 'GA',
    zipCode: '30901',
    systemType: 'Community',
    populationServed: 197166,
    primarySourceType: 'Surface water',
    lat: 33.4735,
    lng: -81.9748,
    pfasDetected: 1,
    pfasLevel: 47.0, // 1175% over EPA limit
    pfasStatus: 'DANGER',
    lastPFASTest: '2024-11-20',
    remediationStatus: 'planned',
    remediationDeadline: '2026-06-30',
  },
  {
    pwsid: 'GA3130000',
    name: 'Dalton Utilities',
    county: 'Whitfield',
    city: 'Dalton',
    state: 'GA',
    zipCode: '30720',
    systemType: 'Community',
    populationServed: 33128,
    primarySourceType: 'Surface water',
    lat: 34.7698,
    lng: -84.9702,
    pfasDetected: 1,
    pfasLevel: 156.0, // Thousands of times over limit
    pfasStatus: 'DANGER',
    lastPFASTest: '2024-10-10',
    remediationStatus: 'in_progress',
    remediationDeadline: '2025-09-30',
  },
  {
    pwsid: 'GA0670100',
    name: 'Clayton County Water Authority',
    county: 'Clayton',
    city: 'Morrow',
    state: 'GA',
    zipCode: '30260',
    systemType: 'Community',
    populationServed: 285000,
    primarySourceType: 'Surface water',
    lat: 33.5835,
    lng: -84.3402,
    pfasDetected: 1,
    pfasLevel: 12.3,
    pfasStatus: 'WARNING',
    lastPFASTest: '2024-09-15',
    remediationStatus: 'planned',
    remediationDeadline: '2027-01-01',
  },
  {
    pwsid: 'GA0890000',
    name: 'DeKalb County Water',
    county: 'DeKalb',
    city: 'Decatur',
    state: 'GA',
    zipCode: '30030',
    systemType: 'Community',
    populationServed: 760000,
    primarySourceType: 'Surface water',
    lat: 33.7748,
    lng: -84.2963,
    pfasDetected: 0,
    pfasLevel: 2.1, // Below EPA limit
    pfasStatus: 'SAFE',
    lastPFASTest: '2024-12-01',
    remediationStatus: 'none',
    remediationDeadline: null,
  },
];

// PFAS contaminant reference data
const pfasContaminants: NewContaminant[] = [
  {
    contaminantCode: 'PFOA',
    contaminantName: 'Perfluorooctanoic acid',
    category: 'PFAS',
    mcl: 4.0,
    mclUnit: 'ppt',
    healthEffects: 'Decreased fertility, developmental effects in fetuses and infants, cancer (kidney and testicular), liver damage, increased cholesterol, thyroid disease',
    sources: 'Industrial discharge, firefighting foam, consumer products (non-stick cookware, food packaging, stain-resistant fabrics)',
    vulnerableGroups: 'Pregnant women, nursing mothers, infants, children',
    treatmentMethods: 'Granular activated carbon (GAC), ion exchange resins, reverse osmosis',
    isPFAS: 1,
    pfasType: 'long-chain',
  },
  {
    contaminantCode: 'PFOS',
    contaminantName: 'Perfluorooctane sulfonic acid',
    category: 'PFAS',
    mcl: 4.0,
    mclUnit: 'ppt',
    healthEffects: 'Decreased fertility, developmental effects, cancer risk, liver damage, immune system effects, thyroid hormone disruption',
    sources: 'Industrial discharge, firefighting foam, metal plating, semiconductors, textiles',
    vulnerableGroups: 'Pregnant women, nursing mothers, infants, children',
    treatmentMethods: 'Granular activated carbon (GAC), ion exchange resins, reverse osmosis',
    isPFAS: 1,
    pfasType: 'long-chain',
  },
  {
    contaminantCode: 'PFNA',
    contaminantName: 'Perfluorononanoic acid',
    category: 'PFAS',
    mcl: 10.0,
    mclUnit: 'ppt',
    healthEffects: 'Developmental effects, liver damage, immune system effects, increased cholesterol',
    sources: 'Industrial processes, consumer products, food packaging',
    vulnerableGroups: 'Pregnant women, children',
    treatmentMethods: 'Granular activated carbon (GAC), ion exchange resins',
    isPFAS: 1,
    pfasType: 'long-chain',
  },
  {
    contaminantCode: 'PFHxS',
    contaminantName: 'Perfluorohexane sulfonic acid',
    category: 'PFAS',
    mcl: 10.0,
    mclUnit: 'ppt',
    healthEffects: 'Thyroid disease, liver damage, decreased antibody response, reproductive effects',
    sources: 'Firefighting foam, carpet treatments, industrial processes',
    vulnerableGroups: 'All populations',
    treatmentMethods: 'Granular activated carbon (GAC), ion exchange resins',
    isPFAS: 1,
    pfasType: 'short-chain',
  },
];

// Sample PFAS readings for hotspot systems
const samplePFASReadings: NewPFASReading[] = [
  // Calhoun readings showing increasing trend
  {
    pwsid: 'GA1210000',
    contaminant: 'PFOA',
    level: 15.2,
    testDate: '2024-06-15',
    testMethod: 'EPA Method 537.1',
    labName: 'Georgia Public Health Laboratory',
    exceedsLimit: 1,
    epaLimit: 4.0,
    percentOverLimit: 280,
  },
  {
    pwsid: 'GA1210000',
    contaminant: 'PFOS',
    level: 13.3,
    testDate: '2024-06-15',
    testMethod: 'EPA Method 537.1',
    labName: 'Georgia Public Health Laboratory',
    exceedsLimit: 1,
    epaLimit: 4.0,
    percentOverLimit: 232.5,
  },
  {
    pwsid: 'GA1210000',
    contaminant: 'PFOA',
    level: 18.5,
    testDate: '2024-12-15',
    testMethod: 'EPA Method 537.1',
    labName: 'Georgia Public Health Laboratory',
    exceedsLimit: 1,
    epaLimit: 4.0,
    percentOverLimit: 362.5,
  },
  {
    pwsid: 'GA1210000',
    contaminant: 'PFOS',
    level: 10.0,
    testDate: '2024-12-15',
    testMethod: 'EPA Method 537.1',
    labName: 'Georgia Public Health Laboratory',
    exceedsLimit: 1,
    epaLimit: 4.0,
    percentOverLimit: 150,
  },
  // Augusta readings
  {
    pwsid: 'GA2450000',
    contaminant: 'PFOS',
    level: 36.3,
    testDate: '2024-11-20',
    testMethod: 'EPA Method 537.1',
    labName: 'TestAmerica Laboratories',
    exceedsLimit: 1,
    epaLimit: 4.0,
    percentOverLimit: 807.5,
  },
  {
    pwsid: 'GA2450000',
    contaminant: 'PFOA',
    level: 10.7,
    testDate: '2024-11-20',
    testMethod: 'EPA Method 537.1',
    labName: 'TestAmerica Laboratories',
    exceedsLimit: 1,
    epaLimit: 4.0,
    percentOverLimit: 167.5,
  },
];

// Sample violations
const sampleViolations: NewViolation[] = [
  {
    pwsid: 'GA1210000',
    violationId: 'GA1210000-2024-001',
    violationType: 'MCL',
    contaminantCode: 'PFOA',
    contaminantName: 'Perfluorooctanoic acid',
    violationStatus: 'OPEN',
    violationDate: '2024-06-30',
    complianceDate: null,
    severity: 'NON-ACUTE',
    publicNoticeRequired: 1,
  },
  {
    pwsid: 'GA2450000',
    violationId: 'GA2450000-2024-002',
    violationType: 'MCL',
    contaminantCode: 'PFOS',
    contaminantName: 'Perfluorooctane sulfonic acid',
    violationStatus: 'OPEN',
    violationDate: '2024-11-30',
    complianceDate: null,
    severity: 'NON-ACUTE',
    publicNoticeRequired: 1,
  },
];

// Sample health advisory
const sampleHealthAdvisories: NewHealthAdvisory[] = [
  {
    pwsid: 'GA3130000',
    advisoryType: 'DO_NOT_DRINK',
    status: 'ACTIVE',
    startDate: '2024-10-15',
    endDate: null,
    affectedPopulation: 33128,
    publicNoticeText: 'Do not drink tap water due to extremely high levels of PFAS contamination. Use bottled water for drinking and cooking.',
    alternativeWaterInfo: 'Free bottled water distribution at Dalton Convention Center, 2211 Dug Gap Battle Rd, daily 8am-6pm',
  },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(healthAdvisories);
    await db.delete(violations);
    await db.delete(pfasReadings);
    await db.delete(waterSystems);
    await db.delete(contaminants);

    // Insert contaminants
    console.log('Inserting contaminant reference data...');
    await db.insert(contaminants).values(pfasContaminants);

    // Insert water systems
    console.log('Inserting water systems...');
    await db.insert(waterSystems).values(hotspotSystems);

    // Insert PFAS readings
    console.log('Inserting PFAS readings...');
    await db.insert(pfasReadings).values(samplePFASReadings);

    // Insert violations
    console.log('Inserting violations...');
    await db.insert(violations).values(sampleViolations);

    // Insert health advisories
    console.log('Inserting health advisories...');
    await db.insert(healthAdvisories).values(sampleHealthAdvisories);

    console.log('✅ Database seeded successfully!');
    
    // Quick verification
    const systemCount = await db.select().from(waterSystems);
    const pfasCount = await db.select().from(pfasReadings);
    console.log(`\n📊 Seed results:`);
    console.log(`- Water systems: ${systemCount.length}`);
    console.log(`- PFAS readings: ${pfasCount.length}`);
    console.log(`- Contaminants: ${pfasContaminants.length}`);
    console.log(`- Violations: ${sampleViolations.length}`);
    console.log(`- Health advisories: ${sampleHealthAdvisories.length}`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

// Run seed if called directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seed };