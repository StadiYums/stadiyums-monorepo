import type { ReactNode } from "react";
import type { MenuItemId } from "../lib/orderStatus";

const ICONS: Record<MenuItemId, ReactNode> = {
  popcorn: (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M18 26h28l-3 30a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4z"
        fill="#F5F3EF"
        stroke="#0B1D33"
        strokeWidth="2"
      />
      <path
        d="M22 26l3 34M32 26v34M42 26l-3 34"
        stroke="#FD490A"
        strokeWidth="2.5"
      />
      <circle cx="24" cy="18" r="6" fill="#F5F3EF" stroke="#0B1D33" strokeWidth="2" />
      <circle cx="32" cy="14" r="7" fill="#F5F3EF" stroke="#0B1D33" strokeWidth="2" />
      <circle cx="41" cy="19" r="6" fill="#F5F3EF" stroke="#0B1D33" strokeWidth="2" />
      <circle cx="29" cy="21" r="5" fill="#F5F3EF" stroke="#0B1D33" strokeWidth="2" />
      <circle cx="37" cy="22" r="5" fill="#F5F3EF" stroke="#0B1D33" strokeWidth="2" />
    </svg>
  ),
  crackerjack: (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <rect x="16" y="16" width="32" height="38" rx="2" fill="#0B1D33" />
      <rect x="16" y="16" width="32" height="10" fill="#FD490A" />
      <path
        d="M32 30l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"
        fill="#F5F3EF"
      />
      <circle cx="14" cy="42" r="3.5" fill="#E8C39E" stroke="#0B1D33" strokeWidth="1.5" />
      <circle cx="50" cy="46" r="3" fill="#E8C39E" stroke="#0B1D33" strokeWidth="1.5" />
      <circle cx="12" cy="50" r="2.5" fill="#E8C39E" stroke="#0B1D33" strokeWidth="1.5" />
    </svg>
  ),
  drink: (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M20 18h24l-3.5 38a3 3 0 0 1-3 2.8h-11a3 3 0 0 1-3-2.8z"
        fill="#F5F3EF"
        stroke="#0B1D33"
        strokeWidth="2"
      />
      <rect x="18" y="14" width="28" height="6" rx="2" fill="#FD490A" />
      <rect
        x="30"
        y="6"
        width="4"
        height="14"
        rx="2"
        fill="#0B1D33"
        transform="rotate(10 32 13)"
      />
      <path
        d="M24 26h16M23 33h18M22.5 40h19"
        stroke="#0B1D33"
        strokeWidth="1.5"
        opacity="0.25"
      />
    </svg>
  ),
  pretzel: (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M32 12c-11 0-18 8-18 17 0 7 5 12 11 12 4 0 7-2.5 7-6.5 0-3-2-5-4.5-5-2 0-3.5 1.3-3.5 3.3 0 1 .5 1.8 1.2 2.3-.5.2-1 .3-1.7.3-3.6 0-6-3-6-6.4C17.5 22 23 16.5 32 16.5S46.5 22 46.5 28.9c0 3.4-2.4 6.4-6 6.4-.7 0-1.2-.1-1.7-.3.7-.5 1.2-1.3 1.2-2.3 0-2-1.5-3.3-3.5-3.3-2.5 0-4.5 2-4.5 5 0 4 3 6.5 7 6.5 6 0 11-5 11-12 0-9-7-17-18-17z"
        fill="none"
        stroke="#B5652C"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="26" cy="20" r="1.1" fill="#0B1D33" />
      <circle cx="34" cy="18" r="1.1" fill="#0B1D33" />
      <circle cx="22" cy="27" r="1.1" fill="#0B1D33" />
      <circle cx="41" cy="24" r="1.1" fill="#0B1D33" />
      <circle cx="38" cy="32" r="1.1" fill="#0B1D33" />
    </svg>
  ),
  hotdog: (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M8 38c0-6 5-10 10-10h28c5 0 10 4 10 10s-5 10-10 10H18c-5 0-10-4-10-10z"
        fill="#F0DBA8"
        stroke="#0B1D33"
        strokeWidth="2"
      />
      <rect
        x="12"
        y="32"
        width="40"
        height="13"
        rx="6.5"
        fill="#C25B3C"
        stroke="#0B1D33"
        strokeWidth="2"
      />
      <path
        d="M14 36c4 4 5-4 9 0s5-4 9 0 5-4 9 0 5-4 9 0"
        fill="none"
        stroke="#FD490A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  burger: (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M12 26c0-8 9-14 20-14s20 6 20 14z"
        fill="#EFC17E"
        stroke="#0B1D33"
        strokeWidth="2"
      />
      <rect x="10" y="26" width="44" height="5" rx="2" fill="#307C27" />
      <rect
        x="10"
        y="33"
        width="44"
        height="8"
        rx="2"
        fill="#6B3A1F"
        stroke="#0B1D33"
        strokeWidth="1.5"
      />
      <rect x="10" y="43" width="44" height="4" fill="#FD490A" opacity="0.85" />
      <path
        d="M10 49c0-3 3-5 22-5s22 2 22 5-3 5-22 5-22-2-22-5z"
        fill="#F0DBA8"
        stroke="#0B1D33"
        strokeWidth="2"
      />
    </svg>
  ),
};

export function MenuIcon({ icon }: { icon: MenuItemId }) {
  return <>{ICONS[icon]}</>;
}
