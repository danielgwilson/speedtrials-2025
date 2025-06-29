# 🚨 CRITICAL

For the sake of time, we're going to do everything locally, so disregard anything about Neon and deployments—and then just hack your way around it for now.

## **Technical Specification: Georgia Public Trust & Compliance Platform**

## 1.0 Introduction & Core Principles

This document outlines the technical architecture and implementation plan for the Georgia Public Trust & Compliance Platform. The project's mission is to transform Georgia's cryptic public water data into a trusted, transparent, and user-centric platform that empowers citizens, operators, and regulators.

This specification is built on a foundation of modern, scalable, and type-safe technologies designed for rapid development and a world-class user experience.

* **Architectural Principles:**
  * **Server-First:** We will leverage the Next.js App Router to co-locate data fetching and mutations with the components that use them, primarily through **Server Actions**. This simplifies the architecture and improves performance.
  * **Type-Safety End-to-End:** From the database schema with Drizzle to the backend logic and frontend components with TypeScript, we will ensure type safety across the entire stack to minimize errors and improve developer velocity.
  * **Infrastructure as Code:** Database schema and migrations will be managed programmatically with Drizzle Kit, ensuring consistency across all environments.
  * **Component-Driven Development:** The UI will be built as a collection of modular, reusable components using ShadCN/UI, which can be generated and modified quickly.

## 2.0 System Architecture

The platform will be a monolithic Next.js 15 application deployed on Vercel, leveraging a serverless Postgres database from Neon.

* **Framework:** **Next.js 15** (App Router) in TypeScript.
* **Database:** **Neon** (Serverless Postgres). This provides a robust, scalable SQL database with features like database branching, which will be invaluable for development and testing.
* **ORM:** **Drizzle ORM**. A lightweight, performant, and type-safe SQL query builder. We will use `drizzle-kit` for schema management and migrations.
* **Backend Logic:**
  * **Server Actions** will be the primary mechanism for all data fetching and mutations. This is the recommended modern approach for Next.js, eliminating the need for traditional API boilerplate.
  * **API Routes** will be used sparingly, reserved for specific use cases such as third-party webhooks or when a conventional REST endpoint is required for external consumption.
* **UI Components:** **ShadCN/UI** and **Tailwind CSS** for a modern, responsive, and accessible design system.
* **Deployment & Hosting:** **Vercel** for the Next.js application, connected directly to the GitHub repository for seamless CI/CD.

*(A diagram illustrating Vercel -\> Next.js (Server Components/Actions) -\> Drizzle -\> Neon would be placed here.)*

-----

## 3.0 Database Schema (Drizzle & Postgres)

The following schema will be defined in `src/lib/db/schema.ts` using Drizzle ORM's syntax. This code-first approach allows us to manage the database schema in version control.

**File: `src/lib/db/schema.ts`**

```typescript
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
```

-----

## 4.0 Data Ingestion & Seeding

A one-time seeding script will be created to populate the Neon database from the provided `.csv` files.

**File: `scripts/seed.ts`**

* **Technology:** Node.js script executed with `tsx`.
* **Libraries:** `papaparse` for efficient CSV parsing, `drizzle-orm` to execute batch inserts.
* **Process:**
    1. The script will connect to the Neon database using the connection string from environment variables.
    2. It will read each `.csv` file from the `data/` directory.
    3. For each file, it will parse the data into a JSON array.
    4. It will transform the data to match the Drizzle schema (e.g., converting strings to numbers, handling date formats).
    5. It will use `db.insert(tableName).values(data)` to perform a bulk insert into the corresponding table.
* **Execution:** `npm run db:seed` (defined in `package.json`).

-----

## 5.0 Backend Logic (Server Actions)

We will define server-side functions that can be called directly from our React components. This co-locates the logic and simplifies the frontend implementation.

**File: `src/app/actions.ts`**

```typescript
'use server';

import { db } from '@/lib/db';
import { waterSystems, violations, geographicAreas } from '@/lib/db/schema';
import { eq, and, like, desc, gte } from 'drizzle-orm';
import { geocodeAddressToCounty } from '@/lib/geo'; // Assumes a geocoding utility

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
```

-----

## 6.0 Frontend Implementation

The frontend will be built using React Server Components (RSCs) by default, opting into Client Components only when interactivity is required.

* **`app/page.tsx`:** The landing page. A **Server Component** that renders the main layout and the `AddressSearch` client component.
* **`app/system/[pwsid]/page.tsx`:** The system details page. This will be an `async` **Server Component**.
  * It will take `pwsid` from the URL params.
    <!-- end list -->
  * It will directly call the `getScorecardData(pwsid)` and `getSystemDetails(pwsid)` server actions.
  * It will pass the resulting data down to other Server and Client components for rendering.
* **`components/AddressSearch.tsx`:** `'use client';` - A client component that manages the state of the input field and handles autocomplete/suggestions by calling the `findWaterSystems` server action.
* **`components/ui/Scorecard.tsx`:** A **Server Component** that receives the scorecard data as props and renders the grade and summary.
* **`components/ui/ViolationHistory.tsx`:** A **Server Component** that receives the list of violations as props and renders them in a timeline.

## 7.0 Deployment & Operations

* **Vercel:**
  * The project will be linked to a GitHub repository. Pushes to the `main` branch will trigger production deployments. Pushes to other branches will create preview deployments.
  * Environment variables (e.g., `POSTGRES_URL` from Neon, geocoding API keys) will be managed in the Vercel project settings.
* **Neon:**
  * We will create a primary branch for production.
  * For development, Vercel's integration with Neon can automatically create a new database branch for each preview deployment, ensuring isolated testing environments.
* **Drizzle Migrations:**
    1. During development, schema changes are made in `src/lib/db/schema.ts`.
    2. Run `npm run db:generate` to have `drizzle-kit` generate a new SQL migration file.
    3. Run `npm run db:migrate` to apply the migration to the database.
    4. The Vercel build process will be configured to automatically run the migration script upon deployment, ensuring the production database schema is always up-to-date.
