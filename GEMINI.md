# Gemini Workspace

This document outlines my understanding of the project and the plan for implementation.

## Project Understanding

The goal is to build a full-stack web application called the "Georgia Public Trust & Compliance Platform". The platform will provide information about public drinking water quality in Georgia to the public, water system operators, and regulators.

### Key Technologies:

*   **Frontend:** Next.js (React) with TypeScript and ShadCN/UI.
*   **Backend:** The user has specified to use Drizzle ORM with a NeonDB serverless Postgres database, which will be integrated directly into the Next.js application. This is a change from the original `TECHNICAL_SPECIFICATION.md` which specified a separate Node.js/Express backend.
*   **Data:** The application will use several CSV files from the `data/` directory to populate the database.

### Core Features:

*   **Address Search:** Users can search for water systems by address.
*   **Water System Scorecard:** A visual representation of a water system's compliance status.
*   **Detailed Information:** Detailed information about water systems, including contaminant data and violation history.
*   **Interactive Map:** A map to visualize water system boundaries and scorecards.

## Implementation Plan

I will implement the application in the following phases:

### Phase 1: Database and API Setup

1.  **Setup NeonDB:** Create a new NeonDB serverless Postgres database.
2.  **Install Drizzle ORM:** Install and configure Drizzle ORM in the Next.js application.
3.  **Define Database Schema:** Create the database schema using Drizzle ORM based on the `TECHNICAL_SPECIFICATION.md`.
4.  **Seed the Database:** Write a script to seed the database with data from the CSV files in the `data/` directory.
5.  **Create API Endpoints:** Create the API endpoints within the Next.js application to query the database.

### Phase 2: Frontend Development

1.  **Build UI Components:** Create the UI components specified in the `TECHNICAL_SPECIFICATION.md` using ShadCN/UI.
2.  **Implement Pages:** Create the `index` and `system/[pwsid]` pages.
3.  **Integrate API:** Connect the frontend components to the API endpoints to fetch and display data.

### Phase 3: Deployment and Operations

1.  **Deploy to Vercel:** Deploy the Next.js application to Vercel.
2.  **Setup Monitoring:** Integrate a monitoring service like Sentry to track application performance and errors.
3.  **Setup CI/CD:** Create a CI/CD pipeline using GitHub Actions to automate testing and deployment.
