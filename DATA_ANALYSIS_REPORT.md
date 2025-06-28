# Georgia Drinking Water Data Analysis & Strategic Recommendations

## Executive Summary

This comprehensive analysis examines the Georgia Safe Drinking Water Information System (SDWIS) dataset and provides strategic recommendations for building a modern, data-driven application that serves the public, water system operators, and regulators. The analysis identifies **PWSID** as the universal primary key linking all water system data, reveals critical data gaps requiring augmentation with health advisory limits, and proposes a transformed database architecture optimized for real-world use cases.

## Part 1: Data Structure & Schema Analysis

### Overview of Dataset Structure

The Georgia SDWIS export contains 10 interconnected CSV files representing a complete Q1 2025 snapshot of the state's drinking water systems. The data follows a hub-and-spoke model with the Public Water Systems table at the center.

### Detailed Schema Analysis

#### 1. SDWA_PUB_WATER_SYSTEMS.csv (Central Hub)
**Primary Key:** `SUBMISSIONYEARQUARTER`, `PWSID`

| Column Name | Data Type | Description/Example |
|------------|-----------|-------------------|
| SUBMISSIONYEARQUARTER | String(7) | Fiscal year + quarter (e.g., "2025Q1") |
| **PWSID** | String(9) | **Universal Primary Key** - 2-letter state code + 7 digits (e.g., "GA0010000") |
| PWS_NAME | String(100) | System name (e.g., "BAXLEY") |
| PWS_TYPE_CODE | String(6) | System type: CWS, TNCWS, NTNCWS |
| POPULATION_SERVED_COUNT | Integer | Average daily population served (e.g., 5749) |
| SERVICE_CONNECTIONS_COUNT | Integer | Number of service connections (e.g., 2576) |
| PRIMARY_SOURCE_CODE | String(4) | Water source: GW, SW, GWP, SWP, GU, GUP |
| OWNER_TYPE_CODE | String(1) | Ownership: F, L, M, N, P, S |
| PWS_ACTIVITY_CODE | String(1) | Status: A (Active), I (Inactive), N, M, P |
| ADDRESS_LINE1/2 | String(200) | System address |
| CITY_NAME | String(40) | City location |
| STATE_CODE | String(2) | State abbreviation |
| ZIP_CODE | String(14) | ZIP or ZIP+4 |
| COUNTY_SERVED | String(40) | Primary county served |
| EMAIL_ADDR | String(100) | Administrative contact email |
| PHONE_NUMBER | String(15) | Primary phone number |

#### 2. SDWA_VIOLATIONS_ENFORCEMENT.csv
**Primary Key:** `SUBMISSIONYEARQUARTER`, `PWSID`, `VIOLATION_ID`
**Foreign Key:** Links to PUB_WATER_SYSTEMS via `PWSID`

| Column Name | Data Type | Description/Example |
|------------|-----------|-------------------|
| VIOLATION_ID | String(20) | Unique violation identifier |
| VIOLATION_CODE | String(4) | Violation type code |
| VIOLATION_CATEGORY_CODE | String(5) | Category: TT, MRDL, Other, MCL, MR, MON, RPT |
| IS_HEALTH_BASED_IND | String(1) | Y/N - Health-based violation |
| CONTAMINANT_CODE | String(4) | Contaminant involved (refs REF_CODE_VALUES) |
| VIOL_MEASURE | Numeric | Analytical result exceeding standard |
| UNIT_OF_MEASURE | String(9) | Units for violation measure |
| FEDERAL_MCL | String(31) | Federal Maximum Contaminant Level |
| STATE_MCL | Numeric | State MCL exceeded |
| NON_COMPL_PER_BEGIN_DATE | Date | Start of non-compliance |
| NON_COMPL_PER_END_DATE | Date | End of non-compliance (null if unresolved) |
| VIOLATION_STATUS | String(11) | Resolved/Archived/Addressed/Unaddressed |
| ENFORCEMENT_ACTION_TYPE_CODE | String(4) | Type of enforcement action |
| ENF_ACTION_CATEGORY | String | Formal/Informal/Resolving |

#### 3. SDWA_LCR_SAMPLES.csv (Lead & Copper Rule)
**Primary Key:** `SUBMISSIONYEARQUARTER`, `PWSID`, `SAMPLE_ID`, `SAR_ID`
**Foreign Key:** Links to PUB_WATER_SYSTEMS via `PWSID`

| Column Name | Data Type | Description/Example |
|------------|-----------|-------------------|
| SAMPLE_ID | String(20) | Sample identifier |
| SAR_ID | Integer(9) | Sample Analytical Result ID |
| CONTAMINANT_CODE | String(4) | PB90 (Lead), CU90 (Copper) |
| SAMPLE_MEASURE | Numeric | Measured contaminant value |
| UNIT_OF_MEASURE | String(4) | "mg/L" |
| RESULT_SIGN_CODE | String(1) | L (Less than), E (Equal to) |
| SAMPLING_START_DATE | Date | Monitoring period start |
| SAMPLING_END_DATE | Date | Monitoring period end |

#### 4. SDWA_GEOGRAPHIC_AREAS.csv
**Primary Key:** `SUBMISSIONYEARQUARTER`, `PWSID`, `GEO_ID`
**Foreign Key:** Links to PUB_WATER_SYSTEMS via `PWSID`

| Column Name | Data Type | Description/Example |
|------------|-----------|-------------------|
| GEO_ID | String(20) | Unique geographic identifier |
| AREA_TYPE_CODE | String(4) | CN (County), CT (City), ZC (Zip), TR (Tribal) |
| COUNTY_SERVED | String(40) | County name (e.g., "Appling") |
| CITY_SERVED | String(40) | City name |
| ZIP_CODE_SERVED | String(5) | 5-digit ZIP |
| STATE_SERVED | String(4) | State code |

#### 5. SDWA_REF_CODE_VALUES.csv (Reference Lookup Table)
**Primary Key:** `VALUE_TYPE`, `VALUE_CODE`

| Column Name | Data Type | Description/Example |
|------------|-----------|-------------------|
| VALUE_TYPE | String(40) | Column name referenced |
| VALUE_CODE | String(40) | Code value |
| VALUE_DESCRIPTION | String(250) | Human-readable description |

Example entries:
- VALUE_TYPE: "PWS_TYPE_CODE", VALUE_CODE: "CWS", VALUE_DESCRIPTION: "Community water system"
- VALUE_TYPE: "CONTAMINANT_CODE", VALUE_CODE: "1074", VALUE_DESCRIPTION: "Antimony, Total"

#### 6. SDWA_FACILITIES.csv
**Primary Key:** `SUBMISSIONYEARQUARTER`, `PWSID`, `FACILITY_ID`
**Foreign Key:** Links to PUB_WATER_SYSTEMS via `PWSID`

Contains information about physical facilities (treatment plants, wells, storage, etc.) associated with each water system.

#### 7. SDWA_SITE_VISITS.csv
**Primary Key:** `SUBMISSIONYEARQUARTER`, `PWSID`, `VISIT_ID`
**Foreign Key:** Links to PUB_WATER_SYSTEMS via `PWSID`

Documents regulatory site visits and evaluations of various system components.

#### 8. SDWA_SERVICE_AREAS.csv
**Primary Key:** `SUBMISSIONYEARQUARTER`, `PWSID`
**Foreign Key:** Links to PUB_WATER_SYSTEMS via `PWSID`

Identifies the type of service area (municipal, school, mobile home park, etc.).

### Critical Data Relationships

**The Universal Primary Key: PWSID**

The `PWSID` (Public Water System ID) serves as the universal linking column across all tables. It consists of:
- 2-letter state/region code (always "GA" for Georgia)
- 7-digit unique identifier

This enables joining any table to retrieve comprehensive information about a water system.

### Key Queries Enabled by This Structure

1. **Water System Basic Information:**
   ```sql
   SELECT PWS_NAME, COUNTY_SERVED, POPULATION_SERVED_COUNT 
   FROM SDWA_PUB_WATER_SYSTEMS 
   WHERE PWSID = 'GA0010000'
   ```

2. **Violations History (Last 5 Years):**
   ```sql
   SELECT v.*, r.VALUE_DESCRIPTION as CONTAMINANT_NAME
   FROM SDWA_VIOLATIONS_ENFORCEMENT v
   LEFT JOIN SDWA_REF_CODE_VALUES r 
     ON r.VALUE_TYPE = 'CONTAMINANT_CODE' 
     AND r.VALUE_CODE = v.CONTAMINANT_CODE
   WHERE v.PWSID = 'GA0010000'
     AND v.NON_COMPL_PER_BEGIN_DATE >= '2020-01-01'
   ```

3. **Contaminant Levels (Lead, Copper, Arsenic):**
   ```sql
   SELECT l.*, r.VALUE_DESCRIPTION as CONTAMINANT_NAME
   FROM SDWA_LCR_SAMPLES l
   LEFT JOIN SDWA_REF_CODE_VALUES r
     ON r.VALUE_TYPE = 'CONTAMINANT_CODE'
     AND r.VALUE_CODE = l.CONTAMINANT_CODE
   WHERE l.PWSID = 'GA0010000'
     AND l.CONTAMINANT_CODE IN ('PB90', 'CU90', '1074')
   ```

## Part 2: RFI Deconstruction & Persona Development

### Core Mission Statement

**Georgia EPD Mission:** Transform Georgia's outdated drinking water data system into a modern, accessible platform that provides real-time water quality information to empower public health decisions, streamline operator compliance, and enhance regulatory oversight.

### Detailed Persona User Stories

#### 1. The Public

1. **As a Georgia resident**, I want to **search for my water system by address or ZIP code**, so that I can **quickly find water quality information for my home**.

2. **As a parent**, I want to **understand what violation codes mean in plain language**, so that I can **make informed decisions about my family's water safety**.

3. **As a concerned citizen**, I want to **receive alerts when my water system has new violations**, so that I can **take appropriate precautions immediately**.

4. **As a homebuyer**, I want to **compare water quality between different areas**, so that I can **factor water safety into my housing decision**.

5. **As a community member**, I want to **see historical trends of water quality issues**, so that I can **understand if problems are improving or worsening**.

#### 2. Water System Operators

1. **As a water system operator**, I want to **view all compliance deadlines in a dashboard**, so that I can **prioritize tasks and avoid violations**.

2. **As a small system operator**, I want to **receive automated reminders for sampling requirements**, so that I can **maintain compliance without dedicated compliance staff**.

3. **As a treatment plant manager**, I want to **track corrective actions and their status**, so that I can **demonstrate progress to regulators**.

4. **As a system administrator**, I want to **generate compliance reports automatically**, so that I can **reduce manual paperwork and errors**.

5. **As an operator**, I want to **access historical violation patterns**, so that I can **identify systemic issues requiring infrastructure investment**.

#### 3. Regulators

1. **As a field inspector**, I want to **access system data on mobile devices during site visits**, so that I can **verify information and document findings in real-time**.

2. **As a compliance officer**, I want to **identify systems with patterns of violations**, so that I can **prioritize enforcement resources effectively**.

3. **As an EPA regional coordinator**, I want to **generate aggregate compliance statistics**, so that I can **report on state-wide water quality trends**.

4. **As a regulatory manager**, I want to **track enforcement action effectiveness**, so that I can **adjust strategies for better outcomes**.

5. **As an emergency response coordinator**, I want to **quickly identify affected populations during water emergencies**, so that I can **coordinate appropriate public health responses**.

## Part 3: Strategic Recommendations & Gap Analysis

### Critical Data Gap Analysis

**The Single Biggest Missing Context:** Health Impact Interpretation

While the data shows contaminant measurements (e.g., Lead = 0.015 mg/L), there is **no context for what these numbers mean for human health**. Citizens cannot determine if 0.015 mg/L of lead is safe, concerning, or dangerous without reference values.

### Required Data Augmentation

**Essential External Data Needed: Health Advisory Reference Table**

We need a comprehensive lookup table containing:

1. **Maximum Contaminant Levels (MCLs)** - Legal limits set by EPA
2. **Maximum Contaminant Level Goals (MCLGs)** - Health-based goals (often zero for carcinogens)
3. **Health Advisory Levels** - Short-term and lifetime exposure guidelines
4. **Action Levels** - Trigger points for treatment (e.g., Lead = 0.015 mg/L)
5. **Plain Language Health Effects** - What happens at different exposure levels
6. **Vulnerable Population Warnings** - Special risks for pregnant women, children, elderly

Example structure:
```
CONTAMINANT_CODE | MCL | MCLG | ACTION_LEVEL | HEALTH_EFFECTS | VULNERABLE_GROUPS
PB90 (Lead) | 0.015 mg/L | 0 | 0.015 mg/L | "Delays in development, kidney problems" | "Infants, pregnant women"
```

### Proposed Database Architecture

#### Transform Strategy: From Compliance-Focused to User-Centric

**Current Structure:** Normalized for regulatory reporting
**Proposed Structure:** Denormalized for user experience with specialized views

#### New Table Design

1. **water_systems** (Core system information)
   - Enhanced with geocoding for map integration
   - Current compliance status summary
   - Risk score calculation

2. **violations_enhanced** (Violations with context)
   - Original violation data
   - Health impact severity score (1-10)
   - Plain language explanation
   - Recommended actions for public

3. **contaminant_measurements** (Unified sampling data)
   - Combines LCR and future sampling tables
   - Includes trending calculations
   - Comparison to health standards

4. **health_advisories** (New reference table)
   - MCLs, MCLGs, health effects
   - Risk communication templates
   - Multilingual translations

5. **compliance_tasks** (New for operators)
   - Upcoming deadlines
   - Automated from violation/enforcement data
   - Integration points for notifications

6. **public_alerts** (New for public communication)
   - System-generated from violations
   - Severity-based messaging
   - Distribution tracking

#### Materialized Views for Performance

1. **system_dashboard_view** - Pre-calculated metrics per system
2. **violation_trends_view** - Time-series analysis
3. **geographic_risk_view** - County/city level aggregations
4. **operator_task_view** - Prioritized action items

### Additional Strategic Recommendations

1. **Real-Time Data Integration**
   - Implement CDC Exchange or HL7 FHIR standards for lab result ingestion
   - Create APIs for automated compliance reporting

2. **Predictive Analytics**
   - Machine learning models to predict violation likelihood
   - Infrastructure aging analysis from historical patterns

3. **Mobile-First Design**
   - Progressive Web App for offline access in rural areas
   - Voice interface for accessibility

4. **Community Engagement Features**
   - Water quality report cards (A-F grades)
   - Social sharing for transparency
   - Community reported issues integration

5. **Regulatory Efficiency Tools**
   - Automated violation pattern detection
   - Risk-based inspection scheduling
   - Digital enforcement workflow

## Conclusion

The Georgia drinking water data represents a rich resource currently trapped in a compliance-focused structure. By reimagining this data through the lens of public health outcomes, operator success, and regulatory efficiency, we can create a transformative platform that serves all stakeholders effectively. The critical addition of health context data will bridge the gap between raw numbers and actionable public health information, making Georgia a leader in water quality transparency.