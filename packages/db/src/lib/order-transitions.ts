/**
 * Order lifecycle transition table (HEX-62).
 * Pure helpers only — mutations that apply transitions land in later tickets.
 */

export const ORDER_STATUSES = [
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
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type TransitionActor =
  | "fan"
  | "vendor"
  | "runner"
  | "stadium_operator";

export type TransitionErrorCode =
  | "INVALID_TRANSITION"
  | "WRONG_ACTOR"
  | "VERSION_MISMATCH"
  | "VENDOR_LOCATION_MISMATCH"
  | "NOT_CLAIM_SOURCE"
  | "TERMINAL_STATE";

export type TransitionDefinition = {
  from: OrderStatus;
  to: OrderStatus;
  actors: readonly TransitionActor[];
  /** Human-readable preconditions for implementers. */
  preconditions: string[];
};

/**
 * Happy-path + shortcuts + exception edges.
 * Runner claim is only from `readyForPickup` → `runnerAssigned`.
 */
export const ORDER_TRANSITIONS: readonly TransitionDefinition[] = [
  {
    from: "placed",
    to: "vendorAccepted",
    actors: ["vendor"],
    preconditions: ["Vendor desk owns the order's vendorId / concessionLocationId"],
  },
  {
    from: "placed",
    to: "vendorRejected",
    actors: ["vendor"],
    preconditions: ["Before preparation starts", "rejectionReason required"],
  },
  {
    from: "placed",
    to: "customerCanceled",
    actors: ["fan"],
    preconditions: ["Within cancel window before vendorAccepted"],
  },
  {
    from: "placed",
    to: "operatorCanceled",
    actors: ["stadium_operator"],
    preconditions: ["Audited exception", "cancellationReason required"],
  },
  {
    from: "vendorAccepted",
    to: "preparing",
    actors: ["vendor"],
    preconditions: ["Vendor starts prep"],
  },
  {
    from: "vendorAccepted",
    to: "readyForPickup",
    actors: ["vendor"],
    preconditions: ["Instant-ready shortcut (no prep stage)"],
  },
  {
    from: "vendorAccepted",
    to: "vendorRejected",
    actors: ["vendor"],
    preconditions: ["Before preparation starts", "rejectionReason required"],
  },
  {
    from: "vendorAccepted",
    to: "customerCanceled",
    actors: ["fan"],
    preconditions: ["Within cancel window before preparing"],
  },
  {
    from: "vendorAccepted",
    to: "operatorCanceled",
    actors: ["stadium_operator"],
    preconditions: ["Audited exception"],
  },
  {
    from: "preparing",
    to: "readyForPickup",
    actors: ["vendor"],
    preconditions: ["Prep complete"],
  },
  {
    from: "preparing",
    to: "operatorCanceled",
    actors: ["stadium_operator"],
    preconditions: ["Audited exception"],
  },
  {
    from: "readyForPickup",
    to: "runnerAssigned",
    actors: ["runner"],
    preconditions: [
      "Only normal runner-claim source state",
      "Runner vendor + concessionLocation must match order",
      "Active shift required",
    ],
  },
  {
    from: "readyForPickup",
    to: "operatorCanceled",
    actors: ["stadium_operator"],
    preconditions: ["Audited exception before claim"],
  },
  {
    from: "runnerAssigned",
    to: "atVendor",
    actors: ["runner"],
    preconditions: ["Assigned runner only"],
  },
  {
    from: "atVendor",
    to: "pickedUp",
    actors: ["runner"],
    preconditions: ["Assigned runner only"],
  },
  {
    from: "pickedUp",
    to: "atSection",
    actors: ["runner"],
    preconditions: ["Assigned runner only"],
  },
  {
    from: "atSection",
    to: "delivered",
    actors: ["runner"],
    preconditions: ["Assigned runner only"],
  },
  {
    from: "delivered",
    to: "refunded",
    actors: ["stadium_operator", "vendor"],
    preconditions: [
      "Financial outcome only — does not erase fulfillment history",
      "refundedAt set; status may become refunded or stay delivered with refundedAt (implementers choose; prefer status=refunded)",
    ],
  },
  // Legacy demo edges (until data migrates off on_the_way)
  {
    from: "placed",
    to: "preparing",
    actors: ["vendor", "stadium_operator"],
    preconditions: ["Legacy demo shortcut — prefer vendorAccepted first"],
  },
  {
    from: "preparing",
    to: "on_the_way",
    actors: ["runner", "stadium_operator"],
    preconditions: ["Legacy demo — map to pickedUp in new writers"],
  },
  {
    from: "on_the_way",
    to: "delivered",
    actors: ["runner", "stadium_operator"],
    preconditions: ["Legacy demo terminal step"],
  },
] as const;

export const TERMINAL_STATUSES = [
  "delivered",
  "vendorRejected",
  "customerCanceled",
  "operatorCanceled",
  "refunded",
] as const satisfies readonly OrderStatus[];

export type TransitionEval =
  | { ok: true; transition: TransitionDefinition }
  | {
      ok: false;
      code: TransitionErrorCode;
      message: string;
    };

export function listTransitionsFrom(status: OrderStatus): TransitionDefinition[] {
  return ORDER_TRANSITIONS.filter((t) => t.from === status);
}

export function evaluateTransition(args: {
  from: OrderStatus;
  to: OrderStatus;
  actor: TransitionActor;
  expectedStatusVersion?: number;
  actualStatusVersion?: number;
  runnerVendorMatchesOrder?: boolean;
}): TransitionEval {
  if ((TERMINAL_STATUSES as readonly string[]).includes(args.from) && args.from !== "delivered") {
    return {
      ok: false,
      code: "TERMINAL_STATE",
      message: `Order is terminal (${args.from}); no further fulfillment transitions`,
    };
  }

  if (
    args.expectedStatusVersion !== undefined &&
    args.actualStatusVersion !== undefined &&
    args.expectedStatusVersion !== args.actualStatusVersion
  ) {
    return {
      ok: false,
      code: "VERSION_MISMATCH",
      message: `Expected statusVersion ${args.expectedStatusVersion}, got ${args.actualStatusVersion}`,
    };
  }

  const transition = ORDER_TRANSITIONS.find(
    (t) => t.from === args.from && t.to === args.to,
  );
  if (!transition) {
    return {
      ok: false,
      code: "INVALID_TRANSITION",
      message: `No transition ${args.from} → ${args.to}`,
    };
  }

  if (!transition.actors.includes(args.actor)) {
    return {
      ok: false,
      code: "WRONG_ACTOR",
      message: `Actor ${args.actor} cannot perform ${args.from} → ${args.to}`,
    };
  }

  if (args.from === "readyForPickup" && args.to === "runnerAssigned") {
    if (args.runnerVendorMatchesOrder === false) {
      return {
        ok: false,
        code: "VENDOR_LOCATION_MISMATCH",
        message: "Runner vendor/location does not match order",
      };
    }
  } else if (args.actor === "runner" && args.to === "runnerAssigned") {
    return {
      ok: false,
      code: "NOT_CLAIM_SOURCE",
      message: "Runners may only claim from readyForPickup",
    };
  }

  return { ok: true, transition };
}

/** Map legacy demo statuses onto the granular lifecycle. */
export function fromLegacyDemoStatus(
  status: "placed" | "preparing" | "on_the_way" | "delivered",
): OrderStatus {
  switch (status) {
    case "on_the_way":
      return "pickedUp";
    default:
      return status;
  }
}
