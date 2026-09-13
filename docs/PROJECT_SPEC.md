# Project Specification

## 1. Product goal

Build a simple, polished web application that automates the repetitive parts of creating university lab reports.

The application is a **stateless single-page tool**, not a full student platform.

## 2. User flow

### Step 1 — Student details

Show a clean form with:

- Student Name — required
- Roll Number — required
- University — required
- Class / Section — required
- Instructor Name — required
- Course — required

University options:

```text
Air University
Bahria University
NUST
```

### Step 2 — Lab upload

Accept:

- PDF
- DOC
- DOCX

Use reasonable file-size validation, e.g. 10 MB.

### Step 3 — Generate

When the student clicks **Generate Lab Report**:

1. Validate input.
2. Extract text from the lab.
3. Analyze the lab using AI.
4. Identify tasks and programming requirements.
5. Generate solutions/code where required.
6. Execute supported code safely.
7. Capture actual output.
8. Build the DOCX report.

### Step 4 — Download

Return the generated `.docx`.

Show a simple success state with a download button and an option to start another report.

## 3. AI responsibilities

AI should:

- Understand the uploaded lab.
- Identify questions/tasks.
- Determine required programming language where possible.
- Generate appropriate code.
- Generate concise explanations.
- Produce structured output.

AI should NOT:

- Pretend code was executed.
- Invent program output.
- Change the requirements of the lab.
- Decide document formatting.
- Insert university branding.

Actual execution and document formatting are deterministic application responsibilities.

## 4. Code execution

Start with Python support.

If practical, add C++ and Java afterward.

Unsupported languages should not crash the application.

Execution must happen in an isolated environment. Never run generated code directly on the host machine.

Minimum controls:

- No network access
- Execution timeout
- CPU/memory limits
- Output-size limit
- Temporary filesystem
- Disposable execution environment

If safe sandboxing is unavailable in a deployment environment, execution should be disabled rather than performed unsafely.

## 5. Output screenshots

For terminal programs:

1. Capture actual stdout/stderr.
2. Render the output in a deterministic terminal-style HTML page.
3. Use Playwright to create a PNG.
4. Insert that PNG into the DOCX.

Do not rely on a real operating-system terminal screenshot.

For browser-based lab tasks, Playwright may capture the rendered application/page.

If execution fails, never create fake output.

## 6. Stateless behavior

There is no database.

Student information, uploaded labs, generated code, screenshots, and DOCX files are temporary and should be deleted after processing where practical.

## 7. Error behavior

Use friendly errors such as:

- Invalid input
- Unsupported file
- File too large
- Could not read lab
- AI generation failed
- Code execution failed
- Report generation failed

Do not expose stack traces, secrets, API keys, or internal paths to the user.

## 8. MVP success criteria

The MVP works when a student can:

1. Fill the form.
2. Select Air, Bahria, or NUST.
3. Upload a lab.
4. Generate a solution.
5. Get real output screenshots for supported executable code.
6. Download a formatted DOCX.
7. See the correct university logo/template.
8. Confirm the university name was not injected as normal report text.
