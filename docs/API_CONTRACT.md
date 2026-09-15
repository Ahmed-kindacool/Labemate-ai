# API Contract — POST /api/v1/labs/generate

> **Updated during migration.** Path and field names changed from the
> original Next.js version (`POST /api/generate`, camelCase fields) to
> match the FastAPI backend. See `../MIGRATION_NOTES.md`.

## Request

`multipart/form-data` with these fields:

| Field             | Type   | Required | Notes                                |
|-------------------|--------|----------|----------------------------------------|
| `name`            | string | yes      |                                        |
| `roll_number`     | string | yes      |                                        |
| `university`      | string | yes      | one of `"air" \| "bahria" \| "nust"`  |
| `class_section`   | string | yes      |                                        |
| `instructor_name` | string | yes      |                                        |
| `course`          | string | yes      |                                        |
| `lab_file`        | file   | yes      | PDF, DOC, or DOCX; max 10MB           |

## Success response — `200`

```json
{
  "status": "success",
  "download_url": "/mock/sample-report.docx"
}
```

`download_url` is a placeholder until Phase 7 (real DOCX generation). Build the
download button against this shape now; the value becomes real later without
changing the contract.

## Error response — `400` or `500`

```json
{
  "status": "error",
  "code": "INVALID_INPUT",
  "message": "Please fix the highlighted fields.",
  "field_errors": {
    "name": ["Value error, Name is required"]
  }
}
```

`field_errors` is only present when `code` is `INVALID_INPUT` — use it to
highlight individual form fields. For every other code, show `message` as a
general error banner.

### Error codes

| Code                     | Meaning                              |
|--------------------------|----------------------------------------|
| `INVALID_INPUT`          | Missing/invalid form fields or no file |
| `UNSUPPORTED_FILE`       | Wrong file type                        |
| `FILE_TOO_LARGE`         | File exceeds 10MB                      |
| `LAB_READ_FAILED`        | Parsing failed (Phase 2+)              |
| `AI_GENERATION_FAILED`   | AI step failed (Phase 3+)              |
| `EXECUTION_FAILED`       | Code execution failed (Phase 4+)       |
| `REPORT_GENERATION_FAILED` | DOCX build failed (Phase 7+)         |

Only `INVALID_INPUT`, `UNSUPPORTED_FILE`, and `FILE_TOO_LARGE` are reachable
right now — the rest exist in the type so the frontend's error-state UI can
be built once and not revisited each phase.

## Interactive docs

FastAPI serves live, always-up-to-date request/response schemas at
`http://localhost:8000/docs` once the backend is running — useful for
double-checking this file hasn't drifted from the actual code.

## Open question for "Together" discussion

Is `download_url` the right final shape, or should the route stream the file
directly in the response once Phase 7 lands? Doesn't block Phase 1 — flagged
for later.
