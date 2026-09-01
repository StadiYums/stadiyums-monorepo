CREATE TYPE "public"."order_status" AS ENUM('placed', 'vendorAccepted', 'preparing', 'readyForPickup', 'runnerAssigned', 'atVendor', 'pickedUp', 'on_the_way', 'atSection', 'delivered', 'vendorRejected', 'customerCanceled', 'operatorCanceled', 'refunded');
CREATE TYPE "public"."order_actor_role" AS ENUM('fan', 'vendor', 'runner', 'stadium_operator');

CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_number" integer NOT NULL,
	"aisle" text NOT NULL,
	"seat" text NOT NULL,
	"items" jsonb NOT NULL,
	"status" "order_status" NOT NULL,
	"status_version" integer,
	"placed_at" timestamp with time zone NOT NULL,
	"delivered_at" timestamp with time zone,
	"vendor_accepted_at" timestamp with time zone,
	"preparation_started_at" timestamp with time zone,
	"ready_for_pickup_at" timestamp with time zone,
	"runner_assigned_at" timestamp with time zone,
	"arrived_at_vendor_at" timestamp with time zone,
	"picked_up_at" timestamp with time zone,
	"arrived_at_section_at" timestamp with time zone,
	"vendor_rejected_at" timestamp with time zone,
	"canceled_at" timestamp with time zone,
	"vendor_delay_reported_at" timestamp with time zone,
	"vendor_delay_reason" text,
	"vendor_delay_note_id" text,
	"stadium_account_id" text,
	"venue_id" text,
	"event_id" text,
	"sales_authorization_id" text,
	"vendor_id" uuid,
	"concession_location_id" text,
	"menu_version_id" text,
	"guest_session_id" text,
	"section" text,
	"row" text,
	"runner_id" uuid,
	"shift_id" uuid,
	"rejection_reason" text,
	"cancellation_reason" text,
	"canceled_by_role" "order_actor_role",
	"refunded_at" timestamp with time zone,
	"vendor_paused_at_place" boolean,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "runners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" text NOT NULL,
	"pin_hash" text NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "zones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stadium_id" text NOT NULL,
	"name" text NOT NULL,
	"section_min" integer NOT NULL,
	"section_max" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "shifts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"runner_id" uuid NOT NULL,
	"zone_id" uuid NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"ended_at" timestamp with time zone,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "vendors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"zone_id" uuid NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"prep_time_minutes" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "menu_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vendor_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"image_url" text,
	"modifiers" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "demo_meta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"order_counter" integer NOT NULL
);

ALTER TABLE "shifts" ADD CONSTRAINT "shifts_runner_id_runners_id_fk" FOREIGN KEY ("runner_id") REFERENCES "public"."runners"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_zone_id_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zones"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_vendor_id_vendors_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("id") ON DELETE no action ON UPDATE no action;

CREATE INDEX "orders_by_status_idx" ON "orders" USING btree ("status");
CREATE INDEX "orders_by_placed_at_idx" ON "orders" USING btree ("placed_at");
CREATE INDEX "orders_by_order_number_idx" ON "orders" USING btree ("order_number");
CREATE INDEX "orders_by_vendor_and_status_idx" ON "orders" USING btree ("vendor_id","status");
CREATE INDEX "orders_by_runner_and_status_idx" ON "orders" USING btree ("runner_id","status");
CREATE INDEX "orders_by_event_and_status_idx" ON "orders" USING btree ("event_id","status");
CREATE INDEX "orders_by_stadium_and_status_idx" ON "orders" USING btree ("stadium_account_id","status");
CREATE INDEX "runners_by_employee_id_idx" ON "runners" USING btree ("employee_id");
CREATE INDEX "zones_by_stadium_idx" ON "zones" USING btree ("stadium_id");
CREATE INDEX "shifts_by_runner_active_idx" ON "shifts" USING btree ("runner_id","is_available");
CREATE INDEX "shifts_by_zone_idx" ON "shifts" USING btree ("zone_id");
CREATE INDEX "vendors_by_zone_idx" ON "vendors" USING btree ("zone_id");
CREATE INDEX "menu_items_by_vendor_idx" ON "menu_items" USING btree ("vendor_id");
CREATE INDEX "demo_meta_by_key_idx" ON "demo_meta" USING btree ("key");
