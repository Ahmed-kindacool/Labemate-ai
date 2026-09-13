import { z } from "zod";

export const UniversitySchema = z.enum(["air", "bahria", "nust"]);

export const StudentInfoSchema = z.object({
  studentName: z.string().trim().min(1, "Student name is required"),
  rollNumber: z.string().trim().min(1, "Roll number is required"),
  university: UniversitySchema,
  classSection: z.string().trim().min(1, "Class/section is required"),
  instructorName: z.string().trim().min(1, "Instructor name is required"),
  course: z.string().trim().min(1, "Course is required"),
});

export type StudentInfoInput = z.infer<typeof StudentInfoSchema>;

export const ACCEPTED_LAB_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const MAX_LAB_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB — see PROJECT_SPEC.md §2

/**
 * Returns a user-facing error message if the file is invalid, or null if it's fine.
 * Kept framework-agnostic (plain object, not a File/Blob) so it's easy to unit test.
 */
export function validateLabFile(file: { type: string; size: number }): string | null {
  if (!ACCEPTED_LAB_MIME_TYPES.includes(file.type as (typeof ACCEPTED_LAB_MIME_TYPES)[number])) {
    return "Unsupported file type. Please upload a PDF, DOC, or DOCX file.";
  }
  if (file.size > MAX_LAB_FILE_SIZE_BYTES) {
    return "File is too large. Maximum size is 10MB.";
  }
  return null;
}
