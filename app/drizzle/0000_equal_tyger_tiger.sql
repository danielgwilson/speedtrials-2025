CREATE TABLE "lcr_samples" (
	"id" serial PRIMARY KEY NOT NULL,
	"pwsid" varchar(255) NOT NULL,
	"sample_id" varchar(255) NOT NULL,
	"sampling_end_date" date NOT NULL,
	"contaminant_code" varchar(255) NOT NULL,
	"sample_measure" numeric NOT NULL,
	"unit_of_measure" varchar(255) NOT NULL,
	CONSTRAINT "lcr_samples_sample_id_unique" UNIQUE("sample_id")
);
--> statement-breakpoint
CREATE TABLE "mcls" (
	"id" serial PRIMARY KEY NOT NULL,
	"contaminant" varchar(255) NOT NULL,
	"mclg" varchar(255),
	"mcl" varchar(255) NOT NULL,
	"health_effects" text,
	"source" text,
	CONSTRAINT "mcls_contaminant_unique" UNIQUE("contaminant")
);
--> statement-breakpoint
CREATE TABLE "violations" (
	"id" serial PRIMARY KEY NOT NULL,
	"pwsid" varchar(255) NOT NULL,
	"violation_id" varchar(255) NOT NULL,
	"compliance_period_begin" date NOT NULL,
	"compliance_period_end" date NOT NULL,
	"violation_code" varchar(255) NOT NULL,
	"is_health_based" boolean NOT NULL,
	"contaminant_code" varchar(255),
	CONSTRAINT "violations_violation_id_unique" UNIQUE("violation_id")
);
--> statement-breakpoint
CREATE TABLE "water_systems" (
	"id" serial PRIMARY KEY NOT NULL,
	"pwsid" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"county" varchar(255),
	"population_served" integer,
	"service_connections" integer,
	"primary_source" varchar(255),
	CONSTRAINT "water_systems_pwsid_unique" UNIQUE("pwsid")
);
--> statement-breakpoint
ALTER TABLE "lcr_samples" ADD CONSTRAINT "lcr_samples_pwsid_water_systems_pwsid_fk" FOREIGN KEY ("pwsid") REFERENCES "public"."water_systems"("pwsid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "violations" ADD CONSTRAINT "violations_pwsid_water_systems_pwsid_fk" FOREIGN KEY ("pwsid") REFERENCES "public"."water_systems"("pwsid") ON DELETE no action ON UPDATE no action;