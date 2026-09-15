"""Ported from src/lib/validation/generate-request.schema.ts
(ACCEPTED_LAB_MIME_TYPES, MAX_LAB_FILE_SIZE_BYTES, validateLabFile)."""

ACCEPTED_LAB_MIME_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

MAX_LAB_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10MB — see PROJECT_SPEC.md §2


def validate_lab_file(content_type: str | None, size: int) -> str | None:
    """Returns a user-facing error message if the file is invalid, or None
    if it's fine. Mirrors the TS version's behavior exactly, including
    checking type before size.
    """
    if content_type not in ACCEPTED_LAB_MIME_TYPES:
        return "Unsupported file type. Please upload a PDF, DOC, or DOCX file."
    if size > MAX_LAB_FILE_SIZE_BYTES:
        return "File is too large. Maximum size is 10MB."
    return None
