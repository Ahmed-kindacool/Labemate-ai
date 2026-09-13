import type { StudentInfoInput } from "../validation/generate-request.schema";
import type { GenerateSuccessResponse } from "../../types/api";

export interface GenerateLabReportInput {
  student: StudentInfoInput;
  labFile: {
    name: string;
    type: string;
    size: number;
    // Actual file bytes/Buffer wiring lands with the Lab Parser in Phase 2.
  };
}

/**
 * Coordinates the full generation pipeline:
 *   Lab Parser -> AI Service -> Code Executor -> Screenshot Service
 *   -> Template Service -> DOCX Generator
 *
 * Per PLAN.md Phase 1, this intentionally returns a mock response so the
 * frontend (Developer A) can be built against a stable API contract before
 * the real pipeline stages exist. Each stage gets wired in during its phase.
 */
export class GenerationService {
  async generate(input: GenerateLabReportInput): Promise<GenerateSuccessResponse> {
    void input; // referenced once real stages are wired in

    // TODO(Phase 2): const parsedLab = await labParser.parse(input.labFile)
    // TODO(Phase 3): const generatedLab = await aiService.generateSolutions(parsedLab)
    // TODO(Phase 4): const executionResults = await codeExecutor.run(generatedLab)
    // TODO(Phase 5): const screenshots = await screenshotService.capture(executionResults)
    // TODO(Phase 6/7): const docx = await docxGenerator.render(template, ...)

    return {
      status: "success",
      downloadUrl: "/mock/sample-report.docx",
    };
  }
}
