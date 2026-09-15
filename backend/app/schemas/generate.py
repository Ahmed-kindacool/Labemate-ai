from typing import Literal, Optional, Union

from pydantic import BaseModel

# Ported from `GenerateErrorResponse["code"]` in src/types/api.ts.
AppErrorCode = Literal[
    "INVALID_INPUT",
    "UNSUPPORTED_FILE",
    "FILE_TOO_LARGE",
    "LAB_READ_FAILED",
    "AI_GENERATION_FAILED",
    "EXECUTION_FAILED",
    "REPORT_GENERATION_FAILED",
]


class GenerateSuccessResponse(BaseModel):
    status: Literal["success"] = "success"
    # Placeholder until Phase 7 (real DOCX generation) — same as the
    # original mock. See docs/API_CONTRACT.md "Open question".
    download_url: str


class GenerateErrorResponse(BaseModel):
    status: Literal["error"] = "error"
    code: AppErrorCode
    message: str
    # Present only for INVALID_INPUT, same as the original contract.
    field_errors: Optional[dict[str, list[str]]] = None


GenerateResponse = Union[GenerateSuccessResponse, GenerateErrorResponse]
