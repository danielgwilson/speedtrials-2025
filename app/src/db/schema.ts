import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  date,
  decimal,
  text,
} from "drizzle-orm/pg-core";

export const waterSystems = pgTable("water_systems", {
  id: serial("id").primaryKey(),
  pwsid: varchar("pwsid", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  county: varchar("county", { length: 255 }),
  populationServed: integer("population_served"),
  serviceConnections: integer("service_connections"),
  primarySource: varchar("primary_source", { length: 255 }),
});

export const violations = pgTable("violations", {
  id: serial("id").primaryKey(),
  pwsid: varchar("pwsid", { length: 255 })
    .notNull()
    .references(() => waterSystems.pwsid),
  violationId: varchar("violation_id", { length: 255 }).unique().notNull(),
  compliancePeriodBegin: date("compliance_period_begin").notNull(),
  compliancePeriodEnd: date("compliance_period_end").notNull(),
  violationCode: varchar("violation_code", { length: 255 }).notNull(),
  isHealthBased: boolean("is_health_based").notNull(),
  contaminantCode: varchar("contaminant_code", { length: 255 }),
});

export const lcrSamples = pgTable("lcr_samples", {
  id: serial("id").primaryKey(),
  pwsid: varchar("pwsid", { length: 255 })
    .notNull()
    .references(() => waterSystems.pwsid),
  sampleId: varchar("sample_id", { length: 255 }).unique().notNull(),
  samplingEndDate: date("sampling_end_date").notNull(),
  contaminantCode: varchar("contaminant_code", { length: 255 }).notNull(),
  sampleMeasure: decimal("sample_measure").notNull(),
  unitOfMeasure: varchar("unit_of_measure", { length: 255 }).notNull(),
});

export const mcls = pgTable("mcls", {
  id: serial("id").primaryKey(),
  contaminant: varchar("contaminant", { length: 255 }).unique().notNull(),
  mclg: varchar("mclg", { length: 255 }),
  mcl: varchar("mcl", { length: 255 }).notNull(),
  healthEffects: text("health_effects"),
  source: text("source"),
});
