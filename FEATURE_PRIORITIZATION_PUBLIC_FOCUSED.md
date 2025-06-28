# Georgia Clear Water - PFAS Crisis Response Feature Prioritization

Strategic pivot: This is an emergency response tool for the PFAS contamination crisis, not a routine upgrade.

## Context: Why PFAS Changes Everything
- **Calhoun**: 625% over EPA limits, lawsuits, Erin Brockovich involvement
- **Augusta**: 1,175% over limits, wells shut down
- **New EPA Rule**: 4.0 ppt limit by 2027 (was 70 ppt)
- **Public Panic**: 300% increase in hotline calls

## Prioritization Framework
- **Crisis Impact**: How directly it addresses PFAS emergency (1-5)
- **Trust Building**: How much it rebuilds public confidence (1-5)
- **Compliance Value**: How it helps EPD meet 2027 deadline (1-5)
- **Dev Effort**: Hours in hackathon context

## Phase 1: PFAS Emergency Response MVP (2.5 Hours)

| Feature | Crisis | Trust | Compliance | Time | Implementation |
|---------|--------|-------|------------|------|----------------|
| **PFAS Alert System** | 5 | 5 | 4 | 15min | Red banner + push notification setup |
| **Address → PFAS Status** | 5 | 4 | 3 | 20min | Geocode → PWSID → PFAS check |
| **PFAS Hotspot Map** | 5 | 5 | 5 | 25min | Mapbox with Calhoun, Augusta pins |
| **"What is PFAS?"** | 4 | 5 | 2 | 10min | Plain English explainer cards |
| **Mobile Crisis Mode** | 5 | 4 | 3 | 15min | One-thumb navigation, offline cache |
| **Remediation Timeline** | 4 | 5 | 5 | 20min | "What's being done" per system |
| **Filter Guide** | 4 | 4 | 2 | 10min | Which filters remove PFAS |
| **2027 Countdown** | 3 | 3 | 5 | 10min | Compliance deadline tracker |

**Total**: ~2h 5min (35min buffer for testing/demo prep)

## Phase 2: Enhanced Understanding (If Time Permits)

| Feature | Impact | Effort | Score | Notes |
|---------|---------|---------|-------|-------|
| **Violation timeline** | 4 | 3 | 1.3 | Visual timeline component |
| **Spanish translation** | 4 | 2 | 2.0 | i18n setup + key terms |
| **SMS alert signup** | 4 | 4 | 1.0 | Twilio integration |
| **Historical graphs** | 3 | 3 | 1.0 | Chart.js integration |
| **Nearby systems map** | 3 | 3 | 1.0 | Mapbox integration |

## Phase 3: Power Features (Post-Hackathon)

| Feature | Impact | Effort | Score | Notes |
|---------|---------|---------|-------|-------|
| **Progressive Web App** | 4 | 3 | 1.3 | Offline access |
| **Voice search** | 3 | 4 | 0.75 | Accessibility |
| **API for journalists** | 3 | 3 | 1.0 | Public data access |
| **Email notifications** | 3 | 3 | 1.0 | Proactive updates |
| **Water quality predictions** | 4 | 5 | 0.8 | ML model needed |

## Deprioritized Features (Not Public-Focused)

These features from original PRD are deprioritized for hackathon:
- Operator dashboard (different persona)
- Compliance management tools
- Internal reporting features
- Advanced analytics
- Role-based access control

## Technical Implementation - SQLite + Drizzle Focus

### 1. Database Schema (SQLite + Drizzle ORM)
```typescript
// drizzle/schema.ts - PFAS-focused schema
import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';

export const waterSystems = sqliteTable('water_systems', {
  pwsid: text('pwsid').primaryKey(),
  name: text('name').notNull(),
  county: text('county').notNull(),
  lat: real('lat').notNull(),
  lng: real('lng').notNull(),
  population: integer('population'),
  pfasDetected: integer('pfas_detected', { mode: 'boolean' }),
  pfasLevel: real('pfas_level'), // in ppt
  lastTested: text('last_tested'),
  remediationStatus: text('remediation_status'), // 'none', 'planned', 'in_progress', 'complete'
});

export const pfasReadings = sqliteTable('pfas_readings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pwsid: text('pwsid').references(() => waterSystems.pwsid),
  contaminant: text('contaminant'), // 'PFOA', 'PFOS', etc.
  level: real('level'), // in ppt
  testDate: text('test_date'),
  exceedsLimit: integer('exceeds_limit', { mode: 'boolean' }),
});

// Pre-load with crisis data
const CRISIS_SYSTEMS = [
  { pwsid: 'GA1210000', name: 'Calhoun Water', pfasLevel: 28.5, county: 'Gordon' },
  { pwsid: 'GA2450000', name: 'Augusta Water', pfasLevel: 47.0, county: 'Richmond' },
  // ... more hotspots
];
```

### 2. Core API Routes (Next.js App Router)
```typescript
// app/api/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  
  // 1. Geocode address
  const coords = await geocodeAddress(address);
  
  // 2. Find nearest water system
  const system = await db.select()
    .from(waterSystems)
    .where(/* distance calculation */)
    .limit(1);
  
  // 3. Check PFAS status
  const pfasData = await db.select()
    .from(pfasReadings)
    .where(eq(pfasReadings.pwsid, system.pwsid));
  
  return Response.json({
    system,
    pfasStatus: system.pfasLevel > 4.0 ? 'DANGER' : 'SAFE',
    pfasData
  });
}
```

### 3. Component Architecture (45 min)
```typescript
// Priority components for PFAS crisis
<PFASAlertBanner /> // Red banner if PFAS > 4.0 ppt
<AddressSearchHero /> // Big search bar with geocoding
<PFASMap /> // Mapbox with hotspot markers
<SystemStatusCard /> // Shows PFAS levels in plain English
<RemediationTimeline /> // What's being done
<FilterRecommendations /> // Which filters work for PFAS
```

### 4. Core Routes
- **/** - Search + PFAS map
- **/system/[pwsid]** - Detailed PFAS status
- **/pfas-info** - What is PFAS?
- **/compliance** - EPD dashboard

## Success Metrics for Demo

### Quantitative
- Time to find safety status: <30 seconds (vs 20+ min current)
- Mobile usability score: 95+ (vs current failing)
- Comprehension: 90% understand status without help

### Qualitative  
- "Finally, something I can understand!"
- "I know exactly what to do now"
- "I feel informed, not panicked"

## Demo Scenario - "The Calhoun Crisis"

### Act 1: The Problem (45 sec)
**Setting**: "June 2025, Calhoun, Georgia. Erin Brockovich just held a town hall about PFAS contamination."

- Parent searches gadrinkingwater.net on phone
- Site unusable on mobile
- Requires "Water System ID" and "Analyte Code"
- 45 minutes later: gives up, calls hotline (busy)
- **Emotion**: Panic, distrust, anger

### Act 2: Georgia Clear Water (90 sec)
**Same parent, our solution**:

1. **Search** (5 sec): Types "123 Main St, Calhoun GA"
2. **Alert** (2 sec): Red banner "⚠️ PFAS DETECTED - 28.5 ppt"
3. **Context** (10 sec): "Your water has 'forever chemicals' 7x above EPA's new limit"
4. **Map** (5 sec): Shows they're in the red zone with 1,200 other homes
5. **Action** (15 sec): 
   - "Use bottled water for drinking/cooking"
   - "These filters remove PFAS" → product links
   - "Free water distribution at..." → locations
6. **Timeline** (10 sec): "City installing new filtration system - completion Dec 2025"
7. **Subscribe** (5 sec): "Get alerts when your water is safe again"

### Act 3: EPD Value (30 sec)
**Compliance dashboard view**:
- "1,247 systems need PFAS testing by 2027"
- Real-time compliance tracking
- One-click federal reporting
- "Estimated cost savings: $2.1M in manual reporting"

### Close (15 sec)
"From 45 minutes of confusion to 10 seconds of clarity. Georgia Clear Water: Because in a crisis, every second counts."

## Key Differentiators

1. **Human-Centered**: Built for citizens, not compliance officers
2. **Mobile-First**: Recognizing how people actually access
3. **Plain English**: No degree required to understand
4. **Action-Oriented**: Not just data, but "what to do"
5. **Accessible**: Works for Elena (68) and Sarah (35) equally

## Development Checklist

### Pre-coding (10 min)
- [ ] Next.js project setup with TypeScript
- [ ] Tailwind CSS configured
- [ ] Environment variables for APIs
- [ ] Sample data loaded

### MVP Features (1h 35min)
- [ ] Address search with geocoding
- [ ] PWSID lookup from coordinates  
- [ ] Safety status calculation
- [ ] Plain English mappings
- [ ] Health impact display
- [ ] Mobile responsive design
- [ ] Action guidance cards
- [ ] Error handling

### Polish (15 min)
- [ ] Loading states
- [ ] Error messages
- [ ] SEO meta tags
- [ ] Accessibility check
- [ ] Mobile testing

## Why SQLite + Drizzle for Hackathon

### SQLite Advantages
1. **Zero Setup Time**: No cloud DB provisioning
2. **Pre-loaded Data**: Ship with PFAS hotspot data included
3. **Fast Queries**: Everything in-memory for demo
4. **Portable**: Easy to share/deploy the .db file
5. **Perfect for Read-Heavy**: Public queries dominate

### Drizzle Benefits
1. **Type Safety**: Full TypeScript inference
2. **Lightweight**: Smaller than Prisma, perfect for hackathon
3. **SQL-Like**: Intuitive for quick development
4. **Great with SQLite**: First-class support
5. **Fast Migrations**: Schema changes on the fly

### Sample Query
```typescript
// Find PFAS-affected systems near user
const nearbyPFASSystems = await db.select()
  .from(waterSystems)
  .where(and(
    gt(waterSystems.pfasLevel, 4.0),
    sql`distance(lat, lng, ${userLat}, ${userLng}) < 50`
  ))
  .orderBy(desc(waterSystems.pfasLevel));
```

This architecture lets us focus on the user experience instead of infrastructure, perfect for a 2.5-hour sprint where every minute counts.