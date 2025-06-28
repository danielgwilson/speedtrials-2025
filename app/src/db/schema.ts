import { sqliteTable, text, real, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Main water systems table
export const waterSystems = sqliteTable('water_systems', {
  pwsid: text('pwsid').primaryKey(), // GA0010000 format
  name: text('name').notNull(),
  county: text('county').notNull(),
  city: text('city'),
  state: text('state').default('GA'),
  zipCode: text('zip_code'),
  systemType: text('system_type'), // Community, Non-transient non-community, etc.
  populationServed: integer('population_served'),
  primarySourceType: text('primary_source_type'), // Surface water, Groundwater
  lat: real('lat').notNull(),
  lng: real('lng').notNull(),
  
  // PFAS-specific fields
  pfasDetected: integer('pfas_detected', { mode: 'boolean' }).default(0),
  pfasLevel: real('pfas_level'), // in ppt (parts per trillion)
  pfasStatus: text('pfas_status'), // 'SAFE', 'WARNING', 'DANGER'
  lastPFASTest: text('last_pfas_test'), // ISO date string
  remediationStatus: text('remediation_status'), // 'none', 'planned', 'in_progress', 'complete'
  remediationDeadline: text('remediation_deadline'), // ISO date string
  
  // Metadata
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
});

// PFAS readings table for historical tracking
export const pfasReadings = sqliteTable('pfas_readings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pwsid: text('pwsid').references(() => waterSystems.pwsid).notNull(),
  contaminant: text('contaminant').notNull(), // 'PFOA', 'PFOS', 'PFBS', etc.
  level: real('level').notNull(), // in ppt
  testDate: text('test_date').notNull(), // ISO date string
  testMethod: text('test_method'),
  labName: text('lab_name'),
  exceedsLimit: integer('exceeds_limit', { mode: 'boolean' }).notNull(),
  
  // EPA limits context
  epaLimit: real('epa_limit').default(4.0), // Current EPA MCL in ppt
  percentOverLimit: real('percent_over_limit'), // Calculated field
  
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

// Violations table
export const violations = sqliteTable('violations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pwsid: text('pwsid').references(() => waterSystems.pwsid).notNull(),
  violationId: text('violation_id').unique(),
  violationType: text('violation_type').notNull(), // 'MCL', 'MRDL', 'TT', etc.
  contaminantCode: text('contaminant_code'),
  contaminantName: text('contaminant_name'),
  violationStatus: text('violation_status'), // 'OPEN', 'RESOLVED'
  violationDate: text('violation_date'),
  complianceDate: text('compliance_date'),
  severity: text('severity'), // 'ACUTE', 'NON-ACUTE'
  publicNoticeRequired: integer('public_notice_required', { mode: 'boolean' }),
  
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

// EPA contaminant reference data
export const contaminants = sqliteTable('contaminants', {
  contaminantCode: text('contaminant_code').primaryKey(),
  contaminantName: text('contaminant_name').notNull(),
  category: text('category'), // 'PFAS', 'Inorganic Chemicals', 'Microbials', etc.
  mcl: real('mcl'), // Maximum Contaminant Level
  mclUnit: text('mcl_unit'), // 'mg/L', 'ppt', etc.
  healthEffects: text('health_effects'),
  sources: text('sources'),
  vulnerableGroups: text('vulnerable_groups'),
  treatmentMethods: text('treatment_methods'),
  
  // PFAS-specific
  isPFAS: integer('is_pfas', { mode: 'boolean' }).default(0),
  pfasType: text('pfas_type'), // 'long-chain', 'short-chain'
});

// Geographic service areas (for address lookup)
export const serviceAreas = sqliteTable('service_areas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pwsid: text('pwsid').references(() => waterSystems.pwsid).notNull(),
  areaName: text('area_name'),
  geometry: text('geometry'), // GeoJSON or simplified boundary data
  zipcodes: text('zipcodes'), // Comma-separated list
  counties: text('counties'), // Comma-separated list
});

// Health advisories and alerts
export const healthAdvisories = sqliteTable('health_advisories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pwsid: text('pwsid').references(() => waterSystems.pwsid).notNull(),
  advisoryType: text('advisory_type').notNull(), // 'BOIL_WATER', 'DO_NOT_DRINK', 'DO_NOT_USE'
  status: text('status').notNull(), // 'ACTIVE', 'LIFTED'
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  affectedPopulation: integer('affected_population'),
  publicNoticeText: text('public_notice_text'),
  alternativeWaterInfo: text('alternative_water_info'),
  
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

// Remediation actions tracking
export const remediationActions = sqliteTable('remediation_actions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pwsid: text('pwsid').references(() => waterSystems.pwsid).notNull(),
  actionType: text('action_type').notNull(), // 'FILTRATION_UPGRADE', 'WELL_CLOSURE', 'TREATMENT_SYSTEM'
  status: text('status').notNull(), // 'PLANNED', 'IN_PROGRESS', 'COMPLETE'
  startDate: text('start_date'),
  completionDate: text('completion_date'),
  estimatedCost: real('estimated_cost'),
  fundingSource: text('funding_source'),
  description: text('description'),
  
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

// Create indexes for common queries
export const waterSystemsCountyIndex = sql`CREATE INDEX IF NOT EXISTS idx_water_systems_county ON water_systems(county)`;
export const waterSystemsPFASIndex = sql`CREATE INDEX IF NOT EXISTS idx_water_systems_pfas ON water_systems(pfas_detected, pfas_level)`;
export const pfasReadingsPWSIDIndex = sql`CREATE INDEX IF NOT EXISTS idx_pfas_readings_pwsid ON pfas_readings(pwsid, test_date DESC)`;
export const violationsPWSIDIndex = sql`CREATE INDEX IF NOT EXISTS idx_violations_pwsid ON violations(pwsid, violation_status)`;

// Type exports for TypeScript
export type WaterSystem = typeof waterSystems.$inferSelect;
export type NewWaterSystem = typeof waterSystems.$inferInsert;
export type PFASReading = typeof pfasReadings.$inferSelect;
export type NewPFASReading = typeof pfasReadings.$inferInsert;
export type Violation = typeof violations.$inferSelect;
export type NewViolation = typeof violations.$inferInsert;
export type Contaminant = typeof contaminants.$inferSelect;
export type NewContaminant = typeof contaminants.$inferInsert;
export type ServiceArea = typeof serviceAreas.$inferSelect;
export type NewServiceArea = typeof serviceAreas.$inferInsert;
export type HealthAdvisory = typeof healthAdvisories.$inferSelect;
export type NewHealthAdvisory = typeof healthAdvisories.$inferInsert;
export type RemediationAction = typeof remediationActions.$inferSelect;
export type NewRemediationAction = typeof remediationActions.$inferInsert;