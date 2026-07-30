export type WorkspaceContentWidth = "fluid" | "readable" | "large";
export type WorkspaceVariant = "dashboard" | "table" | "map" | "form" | "kiosk";

const CONTENT_WIDTH_CLASSES: Record<WorkspaceContentWidth, string> = {
  fluid: "w-full",
  readable: "w-full max-w-3xl",
  large: "w-full max-w-[1920px]",
};

const VARIANT_CLASSES: Record<WorkspaceVariant, string> = {
  dashboard: "workspace-variant-dashboard",
  table: "workspace-variant-table",
  map: "workspace-variant-map",
  form: "workspace-variant-form",
  kiosk: "workspace-variant-kiosk",
};

export function workspaceContentClassNames(
  contentWidth: WorkspaceContentWidth,
  variant: WorkspaceVariant,
) {
  return `${CONTENT_WIDTH_CLASSES[contentWidth]} ${VARIANT_CLASSES[variant]}`;
}
