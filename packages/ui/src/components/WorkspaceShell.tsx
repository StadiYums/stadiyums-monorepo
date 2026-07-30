import type { ReactNode } from "react";
import {
  workspaceContentClassNames,
  type WorkspaceContentWidth,
  type WorkspaceVariant,
} from "./workspaceShellClasses";

export type { WorkspaceContentWidth, WorkspaceVariant } from "./workspaceShellClasses";

type WorkspaceShellProps = {
  children: ReactNode;
  sidebar: ReactNode;
  header?: ReactNode;
  sidebarLabel?: string;
  contentWidth?: WorkspaceContentWidth;
  variant?: WorkspaceVariant;
  className?: string;
};

/**
 * Full-viewport shell for operational applications.
 *
 * AppShell remains the mobile-first frame for fan and runner. Use this shell
 * for system-admin/vendor dashboards, tables, maps, forms, and tablet workspaces.
 */
export function WorkspaceShell({
  children,
  sidebar,
  header,
  sidebarLabel = "Workspace navigation",
  contentWidth = "fluid",
  variant = "dashboard",
  className = "",
}: WorkspaceShellProps) {
  return (
    <div className={`min-h-[100dvh] bg-cream ${className}`}>
      <a
        href="#workspace-content"
        className="sr-only z-50 rounded-sm bg-navy px-3 py-2 text-sm text-cream focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to workspace content
      </a>
      <div className="flex min-h-[100dvh] w-full flex-col md:flex-row">
        <aside
          aria-label={sidebarLabel}
          className="w-full shrink-0 border-b border-line md:min-h-[100dvh] md:w-56 md:border-b-0 md:border-r lg:w-64"
        >
          {sidebar}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          {header ? (
            <header className="border-b border-line bg-surface-white">
              {header}
            </header>
          ) : null}
          <main
            id="workspace-content"
            className="min-w-0 flex-1 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8"
          >
            <div
              className={`mx-auto min-h-full ${workspaceContentClassNames(contentWidth, variant)}`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
