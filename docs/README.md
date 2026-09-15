# AI Lab Report Generator

## What is this?

A small AI-powered web application for university students.

A student enters their information, selects their university, uploads a lab PDF/DOC/DOCX, and receives a completed `.docx` lab report containing the relevant solution/code and screenshots of program output where possible.

## MVP

Supported universities:

- Air University
- Bahria University
- NUST

All three use the same report structure. The selected university changes the logo/template only.

### User inputs

- Name
- Roll number
- University
- Class/section
- Instructor name
- Course
- Lab PDF/DOC/DOCX

### Output

A downloadable `.docx` report containing, as appropriate:

- Student information
- Lab title/objectives
- Lab questions/tasks
- Solutions/explanations
- Related source code
- Actual output screenshots
- Conclusion when appropriate

The generated report must **not add the university name as ordinary text**. University identity comes from the selected template/logo.

## Explicitly NOT in the MVP

- No login/signup
- No database
- No user accounts
- No saved history
- No admin dashboard
- No payments
- No chat interface
- No microservices
- No unnecessary enterprise infrastructure

## Stack

> **Updated during migration** — this project started as a single Next.js
> app and was migrated to a split frontend/backend. See
> `../MIGRATION_NOTES.md` at the repo root for the full file-by-file
> mapping from the old stack to this one.

- **Frontend:** React + Vite + TypeScript, Tailwind CSS, shadcn/ui-style
  primitives (Radix-based)
- **Backend:** Python + FastAPI, Pydantic
- OpenAI API (Phase 3, not yet wired)
- DOCX generation library (Phase 7, not yet wired)
- Playwright for screenshots (partially implemented — see
  `backend/app/screenshots/`)
- Docker for isolated code execution (Phase 4, not yet wired)

The implementation should stay small and understandable.

## Main flow

```text
Student Form
    ↓
Upload Lab
    ↓
Extract Lab Content
    ↓
AI Understands Tasks
    ↓
AI Generates Solution/Code
    ↓
Safely Execute Supported Code
    ↓
Capture Output
    ↓
Generate DOCX Using Selected Template
    ↓
Download
```

## Getting started

Backend:

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env
.venv/bin/uvicorn app.main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The frontend talks to
the backend at `http://localhost:8000` (see `FRONTEND_ORIGIN` in
`backend/.env.example` for the CORS side of that).

Fill in `AI_API_KEY` in `backend/.env` before Phase 3 (AI generation) is
wired up — `backend/app/core/config.py` reads it but nothing calls it yet.

## Project layout

See `ARCHITECTURE.md` for the full rationale. Summary:

```text
frontend/
└── src/
    ├── App.tsx                # Landing / generation page
    ├── components/
    │   ├── ui/                 # UI primitives
    │   ├── lab-form/           # Phase 1: student form, university select, upload (stub)
    │   └── generation/         # Phase 1+: progress states, result/download panel (stub)
    └── types/                  # Shared domain + API types (TS side)

backend/
└── app/
    ├── main.py                 # FastAPI app, CORS, router registration
    ├── routes/                 # Thin route handlers (health, lab)
    ├── schemas/                # Pydantic request/response/domain types
    ├── services/                # generation_service.py — coordinates the pipeline
    ├── validation/              # File type/size checks
    ├── core/                    # Settings, AppError + exception handlers
    ├── parsing/                 # Phase 2: lab parsers (stub)
    ├── ai/                      # Phase 3: AI service + provider adapter (stub)
    ├── execution/                # Phase 4: code executor strategies (interface only)
    ├── screenshots/              # Phase 5: Playwright screenshot capture (implemented)
    ├── documents/                 # Phase 7: DOCX generator (stub)
    └── templates_registry/        # Phase 6: university template registry (stub)

templates/                    # air/ · bahria/ · nust/ (added in Phase 6)
```

See `PLAN.md` for the full phase-by-phase roadmap and `PHASE0_DEV_B_NOTES.md`
for what Developer B's half of Phase 0 covers (both describe the pre-migration
Next.js implementation, but the phase plan itself is unchanged).
