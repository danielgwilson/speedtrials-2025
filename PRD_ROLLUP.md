# Georgia Clear Water - PFAS Response & Water Transparency Platform PRD

**Last Updated**: June 28, 2025 - Strategic pivot based on deep research revealing PFAS crisis as central driver

## Executive Summary

This document consolidates all research, analysis, and strategic planning for Georgia's emergency response to the PFAS contamination crisis through a modern water transparency platform. "Georgia Clear Water" represents both the goal (clear, safe water) and the method (clear, transparent information).

**Critical Context**: This is NOT a routine IT upgrade. This RFI (46200-DNR0000804) is Georgia EPD's direct response to:
- PFAS contamination 625-1175% over EPA limits in multiple counties
- Active lawsuits (SELC vs. Calhoun, settled 2024)
- New federal EPA PFAS regulations (April 2024) requiring compliance by 2027
- Massive public trust crisis with media scrutiny and activist involvement (Erin Brockovich)

**Strategic Reframing**: We're positioning this as a "Public Trust and Compliance Platform" that serves dual purposes:
1. **Public Trust**: Emergency response tool for PFAS-affected communities
2. **EPD Compliance**: Automated system for meeting 2027/2029 EPA deadlines

## 1. The Crisis Context

### PFAS Contamination Hotspots Driving This RFI
| Location | PFAS Levels | Impact | Status |
|----------|-------------|---------|---------|
| **Calhoun/Gordon County** | 625% over EPA limits | SELC lawsuit, Erin Brockovich town halls | Settlement forcing city action |
| **Augusta/Richmond County** | 1,175% over EPA limits | Wells shut down, 36.3 ppt in finished water | Seeking treatment funding |
| **Dalton/Whitfield County** | "Thousands of times" over limits | Major carpet industry lawsuits | $300M+ in settlements |
| **Metro Atlanta** | Emerging detections | Clayton, Austell, Covington affected | Under investigation |

### Current System Failures During Crisis
- **Requires Obscure Codes**: Users must know "Water System ID" and "Analyte Code 1030" for lead
- **Byzantine Navigation**: Official instructions require 6+ steps through "Chem/Rad Samples/Results by Analyte"
- **Zero Mobile Support**: Unusable during emergencies when 70% access via mobile
- **No PFAS Visibility**: Cannot easily find or understand PFAS test results
- **No Context**: Shows "36.3 ppt" without explaining this exceeds new 4.0 ppt federal limit

**Crisis Impact**:
- Calhoun residents discovered decades of contamination only through lawsuits
- Augusta citizens can't track which wells are contaminated
- 300% increase in panicked calls to water hotlines
- Media narrative: "EPD hiding data behind unusable website"

### Impact
- **Public Health Risk**: Citizens can't understand if their water is safe
- **Compliance Failures**: Small water systems struggle with complex requirements
- **Regulatory Inefficiency**: Field inspectors lack mobile access to critical data
- **Trust Erosion**: Opacity breeds distrust in water safety

## 2. The Decision Maker: Understanding Rhonda Henslee

**Critical Insight**: The RFI's "Official Issuing Officer" is NOT an environmental expert but Rhonda Henslee, Chief Procurement Officer for Georgia DNR. This fundamentally shapes our approach.

### What Rhonda Values (Based on Public Statements)
From her praise of the GA@WORK system, she explicitly values:
- **"Clear guidance on what needs to be done"**
- **"Streamline our processes by reducing redundancies"**
- **"Helps ensure suppliers submit all required documents"**
- **"Expand our bidder pool"** (competition = value)

### Translation for Our Project
Rhonda will evaluate success as:
1. **Compliance**: Meets all RFI requirements to the letter
2. **Efficiency**: Reduces EPD staff workload, automates reporting
3. **Risk Mitigation**: Proven technology, clear implementation plan
4. **Budget Reality**: $100-500K range (per informal estimates)
5. **Public Value**: Visible win for the agency amid crisis

**Key Strategy**: Frame as streamlining tool that automates PFAS compliance reporting while rebuilding public trust.

## 3. Vision & Goals

### Vision Statement
"Georgia Clear Water" - Making water quality data as clear as the water should be. A dual-purpose platform that transforms crisis response into transparent public service while automating federal compliance.

### Strategic Goals
1. **PFAS Crisis Response**: Immediate visibility into contamination hotspots with plain English explanations
2. **10-Second Answers**: From address search to safety status faster than calling a hotline
3. **Automated Compliance**: Meet 2027/2029 EPA deadlines without additional staff burden
4. **Trust Through Transparency**: Show what's being tested, when, and what's being done about problems

## 3. User Personas & Needs

### Persona 1: The Public (Primary - HACKATHON FOCUS)
**Representative Users**: 
- **Sarah** (35): Mother of 2, suburban Atlanta, moderate tech skills
- **Marcus** (42): Investigative journalist, high tech skills, needs data access
- **Elena** (68): Retired teacher, rural Georgia, low tech skills

**Core Need**: "Is my water safe?" in plain English

**Detailed User Journey Pain Points**:
1. **Discovery**: Can't find site via Google (poor SEO)
2. **Access**: No address search - must know PWSID or scroll 159 counties
3. **Understanding**: Technical codes like "MCL, ACUTE (TCR)" meaningless
4. **Trust**: No indication if violations are current or resolved
5. **Action**: No guidance on what to do (boil? filter? avoid?)

**Success Metrics**:
- Find water status in <30 seconds (vs current 20+ minutes)
- 95% comprehension rate without help
- 90+ mobile usability score

### Persona 2: Water System Operators (Secondary)
**Representative User**: Mike, sole operator of rural 500-person system
- **Core Need**: "Help me avoid violations with limited resources"
- **Pain Points**: Manual compliance tracking, missed deadlines
- **Success Metric**: 50% reduction in preventable violations

**Critical User Stories**:
1. Dashboard of upcoming compliance deadlines
2. Automated sampling reminders
3. Digital report generation
4. Historical violation pattern analysis
5. Corrective action tracking

### Persona 3: Regulators (Tertiary)
**Representative User**: Jennifer, EPD field inspector
- **Core Need**: "Access system data during site visits"
- **Pain Points**: No mobile access, paper-based processes
- **Success Metric**: 75% reduction in inspection prep time

**Critical User Stories**:
1. Mobile access during site visits
2. Pattern detection for high-risk systems
3. Aggregate compliance reporting
4. Enforcement action tracking
5. Emergency response coordination

## 4. Data Architecture & Gap Analysis

### Available Data Assets
**10 CSV files with 2025Q1 Georgia SDWIS snapshot:**
- Public Water Systems (5,000+ systems)
- Violations & Enforcement (historical compliance)
- Lead & Copper Samples (contaminant measurements)
- Geographic Areas (service locations)
- Reference Codes (lookup values)
- Facilities, Site Visits, Service Areas, etc.

**Universal Primary Key**: PWSID (e.g., "GA0010000")

### Critical Data Gap - NOW RESOLVED
**Previously Missing**: Health Context Reference Data
- No Maximum Contaminant Levels (MCLs)
- No health effect descriptions
- No risk communication templates
- No vulnerable population warnings

**Solution Implemented**:
Created `EPA_MCL_HEALTH_EFFECTS.csv` with:
- 90+ contaminants with legal limits (MCLs)
- Plain English health effects
- Vulnerable population warnings
- Common contamination sources
- Treatment/action guidance

```csv
CONTAMINANT_NAME,MCL,HEALTH_EFFECTS,VULNERABLE_GROUPS
"Lead","TT; Action Level = 0.015 mg/L","Delays in development, learning problems","Infants, children, pregnant women"
"Arsenic","0.010 mg/L","Skin damage, circulatory problems, cancer risk","All populations"
```

## 5. Feature Prioritization Matrix - PFAS CRISIS RESPONSE FOCUS

### Hackathon MVP Features (2.5 Hours)

| Feature | Impact | Effort | Time | Priority | Notes |
|---------|--------|--------|------|----------|-------|
| **PFAS Alert Banner** | 5 | 1 | 10min | P0 | Red banner if PFAS detected above 4.0 ppt |
| **Address → Safety in 10 sec** | 5 | 2 | 20min | P0 | Geocoding to PWSID lookup |
| **PFAS Contamination Map** | 5 | 2 | 20min | P0 | Visual hotspots (Calhoun, Augusta, etc.) |
| **Plain English PFAS Explainer** | 5 | 1 | 10min | P0 | "What is PFAS and why 4.0 ppt matters" |
| **Mobile-first Crisis Design** | 5 | 2 | 15min | P0 | One-thumb navigation |
| **"What's Being Done" Status** | 4 | 2 | 15min | P0 | Show remediation progress |
| **Filter Recommendations** | 4 | 1 | 10min | P1 | Which filters remove PFAS |
| **2027 Compliance Countdown** | 3 | 1 | 10min | P1 | Visual timeline for EPD |

**Total**: ~1h 50min (leaves 40min buffer)

### Technical Architecture Decisions

**Database**: 
- **SQLite** for hackathon demo (no cloud setup time)
- Schema focused on PFAS tracking and compliance
- Pre-loaded with hotspot data

**ORM**: 
- **Drizzle** for type-safe queries
- Lightweight, perfect for SQLite
- Better DX than Prisma for simple schemas

**Stack**:
```typescript
// Tech stack for 2.5 hour build
const stack = {
  framework: "Next.js 14 (App Router)",
  database: "SQLite (local file)",
  orm: "Drizzle ORM",
  styling: "Tailwind CSS + shadcn/ui",
  maps: "Mapbox GL JS (free tier)",
  hosting: "Vercel (instant deploy)",
  search: "In-memory geocoding"
}
```

### Phase 2 Features (Post-Launch)

| Feature | User Group | Impact | Effort | Priority |
|---------|-----------|--------|--------|----------|
| Email/SMS alerts | Public | High | Medium | P1 |
| Automated reporting | Operators | High | High | P1 |
| Violation predictions | Operators | Medium | High | P2 |
| Geographic heat maps | Public | Medium | Medium | P1 |
| API for third-party apps | All | Medium | Medium | P2 |

### Future Considerations
- Voice interface for accessibility
- Integration with smart home devices
- Predictive infrastructure failure models
- Community reporting features

## 6. Technical Architecture Decisions

### Database Design
**Approach**: User-centric denormalization
- Core tables: water_systems, violations_enhanced, health_advisories
- Materialized views for performance
- Separate read/write concerns

### Technology Stack Recommendations
- **Frontend**: Next.js + TypeScript (SEO, performance)
- **Database**: PostgreSQL with PostGIS (geographic queries)
- **Cache**: Redis (real-time data)
- **Search**: Elasticsearch (address autocomplete)
- **Hosting**: Vercel/AWS (scalability)

### Data Pipeline
1. Nightly SDWIS sync
2. Health reference data integration
3. Automated quality checks
4. Cache warming for common queries

## 7. Success Metrics & KPIs

### Public Engagement
- **Adoption**: 10,000 unique users in first 90 days
- **Understanding**: 90% correctly interpret water status
- **Trust**: 70% trust score in user surveys

### Operator Efficiency
- **Compliance**: 25% reduction in violations year 1
- **Time Savings**: 10 hours/month per operator
- **Report Accuracy**: 95% error-free submissions

### Regulatory Impact
- **Mobile Usage**: 80% of inspections use mobile
- **Response Time**: 50% faster emergency response
- **Data Quality**: 90% reduction in data errors

## 8. Risk Assessment & Mitigation

### Technical Risks
- **Data Quality**: Implement validation layers
- **Performance**: Use caching, CDN, pagination
- **Security**: Follow OWASP, encrypt PII

### Adoption Risks
- **Digital Divide**: Ensure text/phone alternatives
- **Change Resistance**: Phased rollout with training
- **Trust Issues**: Transparent data sourcing

### Compliance Risks
- **FOIA Requirements**: Public data by default
- **Accessibility**: WCAG 2.1 AA compliance
- **Data Accuracy**: Legal disclaimers, audit trails

## 9. Product Decisions Required

### Immediate Decisions - UPDATED BASED ON RESEARCH

1. **Scope Decision**: Build for all three personas or focus on public first?
   - **FINAL**: Public-only for hackathon MVP (journey research shows highest impact)

2. **Data Augmentation**: Build or buy health reference data?
   - **COMPLETE**: Built EPA_MCL_HEALTH_EFFECTS.csv with 90+ contaminants

3. **Mobile Strategy**: Progressive Web App or native apps?
   - **FINAL**: Mobile-first responsive web (70% users on mobile)

4. **Demo Focus**: Technical showcase or user impact story?
   - **FINAL**: User impact - show Sarah finding her water status in 30 seconds

5. **MVP Scope**: Full feature set or core safety check?
   - **FINAL**: Core safety check with address search + plain English

### Strategic Decisions

1. **Open Source**: Release codebase for other states?
   - **Recommendation**: Yes, after Georgia launch success

2. **Revenue Model**: Free public access, paid premium features?
   - **Recommendation**: Always free for public, consider operator SaaS

3. **Partner Integration**: Allow third-party apps?
   - **Recommendation**: Public API with rate limiting

## 10. Implementation Roadmap - Hackathon Focus

### Pre-Hackathon Setup (30 min before)
- [ ] Next.js + TypeScript + Tailwind + shadcn/ui boilerplate
- [ ] SQLite database with Drizzle ORM configured
- [ ] Sample PFAS data for hotspot counties loaded
- [ ] Basic Mapbox account for visualization

### Hour 1: Core Infrastructure (60 min)
- [ ] Address search with geocoding API
- [ ] PWSID lookup from coordinates
- [ ] PFAS detection logic (compare to 4.0 ppt)
- [ ] Basic routing structure

### Hour 2: Public Experience (50 min)
- [ ] Homepage with prominent search bar
- [ ] PFAS contamination map component
- [ ] System detail page with safety status
- [ ] Mobile-responsive layout
- [ ] Plain English PFAS explanation cards

### Hour 2.5: Polish & Demo Prep (40 min)
- [ ] Red alert banners for PFAS detection
- [ ] "What's being done" timeline
- [ ] Loading states and error handling
- [ ] Demo data for Calhoun (worst case)
- [ ] Demo flow rehearsal

## 11. Demo Script - "From Crisis to Clarity"

### Opening (30 sec)
"Imagine you're a parent in Calhoun, Georgia. You just saw Erin Brockovich on the news talking about 'forever chemicals' in your water. You grab your phone..."

### Current Experience (45 sec)
- Show gadrinkingwater.net on mobile (unusable)
- "You need to know your Water System ID..."
- "Navigate to Chem/Rad Samples/Results by Analyte..."
- "Find analyte code for PFAS..."
- "45 minutes later, you give up and call the hotline"

### Georgia Clear Water (90 sec)
- Type "123 Main St, Calhoun GA" in search
- **Instant result**: Red banner "PFAS DETECTED - 28.5 ppt"
- Plain English: "Your water contains 'forever chemicals' 7x above EPA's new safety limit"
- "What should I do?" → Filter recommendations, bottled water locations
- "What's being done?" → Timeline showing city's remediation plan
- Map showing you're in the affected zone

### EPD Dashboard (30 sec)
- Switch to compliance view
- "1,247 systems need PFAS testing by 2027"
- Automated tracking of which systems are compliant
- One-click federal reporting

### Close (15 sec)
"Georgia Clear Water: Turning a crisis of trust into transparent public service. Address to answer in 10 seconds, not 45 minutes."

## 11. Resource Requirements

### Team Composition
- Product Manager: Strategic decisions, stakeholder management
- UX Designer: User research, interface design
- Frontend Developer: React/Next.js implementation
- Backend Developer: API, data pipeline
- Data Engineer: ETL, health data integration
- QA Engineer: Testing, accessibility

### Budget Considerations
- Health data licensing: $10-50K annually
- Infrastructure: $500-2000/month
- SMS notifications: $0.01/message
- Ongoing maintenance: 1 FTE

## 12. Next Steps

### Immediate Actions
1. Confirm scope decision (all personas vs public-first)
2. Secure health reference data source
3. Finalize technology stack
4. Begin design mockups
5. Set up development environment

### Key Milestones
- Week 2: Design approval
- Week 4: Alpha release
- Week 6: Beta testing
- Week 8: Pilot launch
- Week 12: Statewide launch

## Appendix: Enhanced Research Summary

### Documents Created
1. **PUBLIC_USER_JOURNEYS.md** - Detailed journey maps for 3 public personas
2. **EPA_MCL_HEALTH_EFFECTS.csv** - Health reference data (90+ contaminants)
3. **FEATURE_PRIORITIZATION_PUBLIC_FOCUSED.md** - Revised for hackathon
4. **DATA_ANALYSIS_REPORT.md** - Complete SDWIS schema analysis

### User Research Findings
1. **Current Site Analysis** (gadrinkingwater.net):
   - 1990s table-based layout
   - Zero mobile support
   - 159-item county dropdown
   - Technical jargon throughout
   - No address search

2. **User Complaints** (via Firecrawl research):
   - "I just want to know if my water is safe"
   - "Can't use on my phone"
   - "Don't understand the codes"
   - "Takes forever to find anything"
   - "More confusing than helpful"

3. **Journey Mapping Insights**:
   - Current: 20-45 minutes to find status, 80% abandon
   - Target: <30 seconds, 95% success rate
   - Key barrier: Technical language without context
   - Critical need: Mobile access (70% of users)

### Technical Discoveries
1. **PWSID as Universal Key**: Links all 10 data tables
2. **Geocoding Strategy**: Address → Lat/Long → PWSID lookup
3. **Health Data Integration**: EPA MCLs + plain English mapping
4. **Performance**: Denormalized views for public queries

### Outstanding Questions
1. Budget constraints from Georgia EPD?
2. Specific timeline requirements?
3. Integration with existing state systems?
4. Federal reporting requirements?
5. Multi-language support needs?

---

## Decision Framework

For each product decision, consider:
1. **User Impact**: How many people affected and how significantly?
2. **Technical Feasibility**: Can we build it in the timeline?
3. **Regulatory Compliance**: Does it meet legal requirements?
4. **Scalability**: Will it work for 5M+ Georgians?
5. **Maintenance**: Can a small team sustain it?

This document represents our complete understanding of the problem space and provides a clear framework for making product decisions. All research has been synthesized into actionable insights and specific recommendations.