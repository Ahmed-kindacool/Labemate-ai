from app.schemas.generate import GenerateSuccessResponse
from app.schemas.student import StudentInfo


class GenerationService:
    """Coordinates the full generation pipeline:
        Lab Parser -> AI Service -> Code Executor -> Screenshot Service
        -> Template Service -> DOCX Generator

    Ported from `GenerationService` in
    src/lib/generation/generation.service.ts. Per the original Phase 1
    scope, this intentionally returns a mock response so the frontend can be
    built against a stable API contract before the real pipeline stages
    exist. Each stage gets wired in during its phase — none of that logic
    has been written yet in either language, so none of it is ported here.
    """

    async def generate(
        self,
        student: StudentInfo,
        lab_filename: str,
        lab_content_type: str,
        lab_size: int,
    ) -> GenerateSuccessResponse:
        # Referenced so linters don't flag unused params until the real
        # stages are wired in (mirrors `void input;` in the TS original).
        _ = (student, lab_filename, lab_content_type, lab_size)

        # TODO(Phase 2): parsed_lab = await lab_parser.parse(lab_file)
        # TODO(Phase 3): generated_lab = await ai_service.generate_solutions(parsed_lab)
        # TODO(Phase 4): execution_results = await code_executor.run(generated_lab)
        # TODO(Phase 5): screenshots = await screenshot_service.capture(execution_results)
        # TODO(Phase 6/7): docx = await docx_generator.render(template, ...)

        return GenerateSuccessResponse(download_url="/mock/sample-report.docx")
