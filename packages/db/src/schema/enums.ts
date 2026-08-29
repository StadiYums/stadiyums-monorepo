import { pgEnum } from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", [
  "placed",
  "vendorAccepted",
  "preparing",
  "readyForPickup",
  "runnerAssigned",
  "atVendor",
  "pickedUp",
  "on_the_way",
  "atSection",
  "delivered",
  "vendorRejected",
  "customerCanceled",
  "operatorCanceled",
  "refunded",
]);

export const orderActorRoleEnum = pgEnum("order_actor_role", [
  "fan",
  "vendor",
  "runner",
  "stadium_operator",
]);
