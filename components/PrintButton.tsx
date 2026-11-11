"use client";

export default function PrintButton() {
  return (
    <button type="button" className="btn-ghost print-btn" onClick={() => window.print()}>
      Print / Save PDF
    </button>
  );
}
