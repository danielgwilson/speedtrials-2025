CREATE TABLE `contaminants` (
	`contaminant_code` text PRIMARY KEY NOT NULL,
	`contaminant_name` text NOT NULL,
	`category` text,
	`mcl` real,
	`mcl_unit` text,
	`health_effects` text,
	`sources` text,
	`vulnerable_groups` text,
	`treatment_methods` text,
	`is_pfas` integer DEFAULT 0,
	`pfas_type` text
);
--> statement-breakpoint
CREATE TABLE `health_advisories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pwsid` text NOT NULL,
	`advisory_type` text NOT NULL,
	`status` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text,
	`affected_population` integer,
	`public_notice_text` text,
	`alternative_water_info` text,
	`created_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`pwsid`) REFERENCES `water_systems`(`pwsid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pfas_readings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pwsid` text NOT NULL,
	`contaminant` text NOT NULL,
	`level` real NOT NULL,
	`test_date` text NOT NULL,
	`test_method` text,
	`lab_name` text,
	`exceeds_limit` integer NOT NULL,
	`epa_limit` real DEFAULT 4,
	`percent_over_limit` real,
	`created_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`pwsid`) REFERENCES `water_systems`(`pwsid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `remediation_actions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pwsid` text NOT NULL,
	`action_type` text NOT NULL,
	`status` text NOT NULL,
	`start_date` text,
	`completion_date` text,
	`estimated_cost` real,
	`funding_source` text,
	`description` text,
	`created_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`pwsid`) REFERENCES `water_systems`(`pwsid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `service_areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pwsid` text NOT NULL,
	`area_name` text,
	`geometry` text,
	`zipcodes` text,
	`counties` text,
	FOREIGN KEY (`pwsid`) REFERENCES `water_systems`(`pwsid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `violations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pwsid` text NOT NULL,
	`violation_id` text,
	`violation_type` text NOT NULL,
	`contaminant_code` text,
	`contaminant_name` text,
	`violation_status` text,
	`violation_date` text,
	`compliance_date` text,
	`severity` text,
	`public_notice_required` integer,
	`created_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`pwsid`) REFERENCES `water_systems`(`pwsid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `violations_violation_id_unique` ON `violations` (`violation_id`);--> statement-breakpoint
CREATE TABLE `water_systems` (
	`pwsid` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`county` text NOT NULL,
	`city` text,
	`state` text DEFAULT 'GA',
	`zip_code` text,
	`system_type` text,
	`population_served` integer,
	`primary_source_type` text,
	`lat` real NOT NULL,
	`lng` real NOT NULL,
	`pfas_detected` integer DEFAULT 0,
	`pfas_level` real,
	`pfas_status` text,
	`last_pfas_test` text,
	`remediation_status` text,
	`remediation_deadline` text,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
