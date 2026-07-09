export function ConvexOfflineBanner() {
  return (
    <div
      role="alert"
      className="bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white"
    >
      Backend offline — run{" "}
      <code className="mono rounded bg-white/15 px-1.5 py-0.5 text-[13px]">
        npx convex dev
      </code>{" "}
      in a second terminal, then refresh.
    </div>
  );
}
