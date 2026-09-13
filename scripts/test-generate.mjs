// Manual verification for POST /api/generate — run this against `npm run dev`
// before Dev A's form exists, so you know the endpoint behaves correctly on
// its own. Requires Node 18+ (native fetch/FormData/Blob).
//
// Usage:
//   node scripts/test-generate.mjs            # happy path
//   node scripts/test-generate.mjs --bad      # missing fields (expect 400 + fieldErrors)
//   node scripts/test-generate.mjs --big      # oversized file (expect FILE_TOO_LARGE)
//   node scripts/test-generate.mjs --wrong-type  # unsupported file type

import { readFile } from "node:fs/promises";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const mode = process.argv[2];

async function run() {
  const form = new FormData();

  if (mode !== "--bad") {
    form.set("studentName", "Mahd");
    form.set("rollNumber", "01-123456-001");
    form.set("university", "bahria");
    form.set("classSection", "BSAI-4A");
    form.set("instructorName", "Dr. Example");
    form.set("course", "Artificial Intelligence");
  } else {
    // Deliberately omit required fields to exercise validation.
    form.set("studentName", "");
  }

  if (mode === "--big") {
    const bigBuffer = Buffer.alloc(11 * 1024 * 1024); // 11MB > 10MB limit
    form.set("labFile", new Blob([bigBuffer], { type: "application/pdf" }), "big.pdf");
  } else if (mode === "--wrong-type") {
    form.set("labFile", new Blob(["not a lab"], { type: "text/plain" }), "notes.txt");
  } else {
    const sample = await readFile(new URL("../tmp/sample.pdf", import.meta.url));
    form.set("labFile", new Blob([sample], { type: "application/pdf" }), "sample.pdf");
  }

  const res = await fetch(`${BASE_URL}/api/generate`, { method: "POST", body: form });
  const body = await res.json();

  console.log(`Status: ${res.status}`);
  console.log(JSON.stringify(body, null, 2));
}

run().catch((err) => {
  console.error("Request failed:", err.message);
  process.exit(1);
});
