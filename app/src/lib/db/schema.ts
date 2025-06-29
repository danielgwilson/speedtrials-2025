import { pgTable, serial, varchar, integer, date, boolean, decimal, text } from 'drizzle-orm/pg-core';

// Corresponds to SDWA_PUB_WATER_SYSTEMS.csv
export const waterSystems = pgTable('water_systems', {
  id: serial('id').primaryKey(),
  pwsid: varchar('pwsid', { length: 9 }).unique().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  primacyAgencyCode: varchar('primacy_agency_code', { length: 2 }),
  epaRegion: varchar('epa_region', { length: 2 }),
  pwsActivityCode: varchar('pws_activity_code', { length: 1 }),
  pwsTypeCode: varchar('pws_type_code', { length: 6 }),
  ownerTypeCode: varchar('owner_type_code', { length: 1 }),
  populationServedCount: integer('population_served_count'),
  serviceConnectionsCount: integer('service_connections_count'),
  primarySourceCode: varchar('primary_source_code', { length: 4 }),
  addressLine1: varchar('address_line1', { length: 200 }),
  addressLine2: varchar('address_line2', { length: 200 }),
  cityName: varchar('city_name', { length: 40 }),
  zipCode: varchar('zip_code', { length: 14 }),
  stateCode: varchar('state_code', { length: 2 }),
});

// Corresponds to SDWA_VIOLATIONS_ENFORCEMENT.csv
export const violations = pgTable('violations', {
  id: serial('id').primaryKey(),
  pwsid: varchar('pwsid', { length: 9 }).notNull().references(() => waterSystems.pwsid),
  violationId: varchar('violation_id', { length: 20 }).unique().notNull(),
  facilityId: varchar('facility_id', { length: 12 }),
  nonComplianceBeginDate: date('non_compliance_begin_date'),
  nonComplianceEndDate: date('non_compliance_end_date'),
  violationCode: varchar('violation_code', { length: 4 }),
  violationCategoryCode: varchar('violation_category_code', { length: 5 }),
  isHealthBased: boolean('is_health_based'),
  contaminantCode: varchar('contaminant_code', { length: 4 }),
  violMeasure: decimal('viol_measure'),
  unitOfMeasure: varchar('unit_of_measure', { length: 9 }),
  federalMcl: varchar('federal_mcl', { length: 31 }),
  isMajorViolation: boolean('is_major_viol_ind'),
  violationStatus: varchar('violation_status', { length: 11 }),
});

// Corresponds to SDWA_LCR_Samples.csv
export const lcrSamples = pgTable('lcr_samples', {
  id: serial('id').primaryKey(),
  pwsid: varchar('pwsid', { length: 9 }).notNull().references(() => waterSystems.pwsid),
  sampleId: varchar('sample_id', { length: 20 }).unique().notNull(),
  samplingEndDate: date('sampling_end_date'),
  contaminantCode: varchar('contaminant_code', { length: 4 }).notNull(),
  sampleMeasure: decimal('sample_measure').notNull(),
  unitOfMeasure: varchar('unit_of_measure', { length: 4 }),
});

// Corresponds to SDWA_GEOGRAPHIC_AREAS.csv
export const geographicAreas = pgTable('geographic_areas', {
    id: serial('id').primaryKey(),
    pwsid: varchar('pwsid', { length: 9 }).notNull().references(() => waterSystems.pwsid),
    areaTypeCode: varchar('area_type_code', { length: 4 }),
    countyServed: varchar('county_served', { length: 40 }),
    cityServed: varchar('city_served', { length: 40 }),
    zipCodeServed: varchar('zip_code_served', { length: 5 }),
});

// To be created from external EPA data (e.g., a manually created CSV)
export const mcls = pgTable('mcls', {
  id: serial('id').primaryKey(),
  contaminantCode: varchar('contaminant_code', { length: 4 }).unique().notNull(),
  contaminantName: varchar('contaminant_name', { length: 255 }).notNull(),
  mcl: decimal('mcl').notNull(),
  healthEffects: text('health_effects'),
  source: text('source'),
});