import type { University } from "./lab";

export interface StudentInfo {
  name: string;
  rollNumber: string;
  university: University;
  classSection: string;
  instructorName: string;
  course: string;
}

// Sent as multipart/form-data to POST /api/v1/labs/generate: the StudentInfo
// fields above (as snake_case form fields) plus a "lab_file" file field.
export type GenerateRequestFields = StudentInfo;

export interface GenerateSuccessResponse {
  status: "success";
  downloadUrl: string; // exact delivery mechanism (URL vs stream) — still open, see docs/API_CONTRACT.md
}

export interface GenerateErrorResponse {
  status: "error";
  code:
    | "INVALID_INPUT"
    | "UNSUPPORTED_FILE"
    | "FILE_TOO_LARGE"
    | "LAB_READ_FAILED"
    | "AI_GENERATION_FAILED"
    | "EXECUTION_FAILED"
    | "REPORT_GENERATION_FAILED";
  message: string;
  // Present only for INVALID_INPUT — lets the frontend highlight specific fields
  // instead of showing one generic error banner.
  fieldErrors?: Record<string, string[]>;
}

export type GenerateResponse = GenerateSuccessResponse | GenerateErrorResponse;
