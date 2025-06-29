#!/bin/bash
cd /Users/danielgwilson/local_git/speedtrials-2025/speedtrials-2025

# Launch 5 Claude Code agents
$HOME/go/bin/uzi prompt --agents claude:5 "Please implement the complete technical specification in TECH_SPEC.md. Focus on building the Georgia Public Trust & Compliance Platform with Next.js 15, Drizzle ORM, and ShadCN/UI. For now, use SQLite locally instead of Neon for easier development. Build the full stack application including database schema, data ingestion from CSV files, and user interfaces for public citizens, water system operators, and regulators as specified."

# Start auto mode to monitor agents
$HOME/go/bin/uzi auto