import type { OrderStatus } from "@stadiyums/types";

export type { OrderStatus };

export type OrderItem = {
  menuItemId: string;
  qty: number;
};

export type MenuModifier = {
  id: string;
  label: string;
  options: string[];
};

export type OrderRecord = {
  id: string;
  orderNumber: number;
  aisle: string;
  seat: string;
  items: OrderItem[];
  status: OrderStatus;
  statusVersion: number | null;
  placedAt: Date;
  deliveredAt: Date | null;
  vendorAcceptedAt: Date | null;
  preparationStartedAt: Date | null;
  readyForPickupAt: Date | null;
  runnerAssignedAt: Date | null;
  arrivedAtVendorAt: Date | null;
  pickedUpAt: Date | null;
  arrivedAtSectionAt: Date | null;
  vendorRejectedAt: Date | null;
  canceledAt: Date | null;
  vendorDelayReportedAt: Date | null;
  vendorDelayReason: string | null;
  vendorDelayNoteId: string | null;
  stadiumAccountId: string | null;
  venueId: string | null;
  eventId: string | null;
  salesAuthorizationId: string | null;
  vendorId: string | null;
  concessionLocationId: string | null;
  menuVersionId: string | null;
  guestSessionId: string | null;
  section: string | null;
  row: string | null;
  runnerId: string | null;
  shiftId: string | null;
  rejectionReason: string | null;
  cancellationReason: string | null;
  canceledByRole: string | null;
  refundedAt: Date | null;
  vendorPausedAtPlace: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderDto = {
  id: string;
  orderNumber: number;
  aisle: string;
  seat: string;
  items: OrderItem[];
  status: OrderStatus;
  statusVersion?: number;
  placedAt: number;
  deliveredAt?: number;
  vendorAcceptedAt?: number;
  preparationStartedAt?: number;
  readyForPickupAt?: number;
  runnerAssignedAt?: number;
  arrivedAtVendorAt?: number;
  pickedUpAt?: number;
  arrivedAtSectionAt?: number;
  vendorRejectedAt?: number;
  canceledAt?: number;
  vendorDelayReportedAt?: number;
  vendorDelayReason?: string;
  vendorDelayNoteId?: string;
  stadiumAccountId?: string;
  venueId?: string;
  eventId?: string;
  salesAuthorizationId?: string;
  vendorId?: string;
  concessionLocationId?: string;
  menuVersionId?: string;
  guestSessionId?: string;
  section?: string;
  row?: string;
  runnerId?: string;
  shiftId?: string;
  rejectionReason?: string;
  cancellationReason?: string;
  canceledByRole?: string;
  refundedAt?: number;
  vendorPausedAtPlace?: boolean;
};
