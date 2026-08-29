"use client";

export function ConnectionBanner({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="border-b border-orange/30 bg-accent-tint-10 px-4 py-2 text-center text-sm font-medium text-orange-dim"
    >
      {message}
    </div>
  );
}
