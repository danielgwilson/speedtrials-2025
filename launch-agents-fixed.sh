#!/bin/bash

# Navigate to the main repository
cd /Users/danielgwilson/local_git/speedtrials-2025/speedtrials-2025

# Make sure we're on the main branch
git checkout main 2>/dev/null || true

# Make sure we have the latest changes
git pull origin main 2>/dev/null || true

# Clear any existing uzi data that might be corrupted
rm -rf ~/.local/share/uzi 2>/dev/null || true

# Create the uzi data directory
mkdir -p ~/.local/share/uzi

# Launch 5 Claude Code agents
echo "Launching 5 Claude Code agents..."
$HOME/go/bin/uzi prompt --agents claude:5 "Please implement the complete technical specification in TECH_SPEC.md. Focus on building the Georgia Public Trust & Compliance Platform with Next.js 15, Drizzle ORM, and ShadCN/UI. For now, use SQLite locally instead of Neon for easier development. Build the full stack application including database schema, data ingestion from CSV files, and user interfaces for public citizens, water system operators, and regulators as specified."

# Wait a moment for agents to initialize
sleep 2

# Check agent status
echo -e "\nChecking agent status..."
$HOME/go/bin/uzi ls

# Start auto mode
echo -e "\nStarting auto mode to monitor agents..."
$HOME/go/bin/uzi auto