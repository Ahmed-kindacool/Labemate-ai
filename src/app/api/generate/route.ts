import { NextRequest, NextResponse } from "next/server";
import {
  StudentInfoSchema,
  validateLabFile,
} from "../../../lib/validation/generate-request.schema";
import { GenerationService } from "../../../lib/generation/generation.service";
import { AppError, isAppError } from "../../../lib/errors/app-error";
import type { GenerateResponse } from "../../../types/api";

const generationService = new GenerationService();

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const formData = await req.formData();

    const rawFields = {
      studentName: formData.get("studentName"),
      rollNumber: formData.get("rollNumber"),
      university: formData.get("university"),
      classSection: formData.get("classSection"),
      instructorName: formData.get("instructorName"),
      course: formData.get("course"),
    };

    const parsedFields = StudentInfoSchema.safeParse(rawFields);
    if (!parsedFields.success) {
      throw new AppError(
        "INVALID_INPUT",
        parsedFields.error.issues.map((issue) => issue.message).join(" ")
      );
    }

    const labFile = formData.get("labFile");
    if (!(labFile instanceof File)) {
      throw new AppError("INVALID_INPUT", "A lab file (PDF, DOC, or DOCX) is required.");
    }

    const fileError = validateLabFile(labFile);
    if (fileError) {
      const code = fileError.includes("large") ? "FILE_TOO_LARGE" : "UNSUPPORTED_FILE";
      throw new AppError(code, fileError);
    }

    const result = await generationService.generate({
      student: parsedFields.data,
      labFile: { name: labFile.name, type: labFile.type, size: labFile.size },
    });

    return NextResponse.json(result);
  } catch (err) {
    if (isAppError(err)) {
      return NextResponse.json(
        { status: "error", code: err.code, message: err.message },
        { status: 400 }
      );
    }

    // Never leak stack traces, secrets, or internal paths (PROJECT_SPEC.md §7).
    return NextResponse.json(
      {
        status: "error",
        code: "INVALID_INPUT",
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
