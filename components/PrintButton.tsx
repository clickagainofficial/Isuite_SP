"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button type="button" className="btn-ghost print-btn" onClick={() => window.print()}>
      <Printer size={14} strokeWidth={2} aria-hidden />
      Print / Save PDF
    </button>
  );
}
