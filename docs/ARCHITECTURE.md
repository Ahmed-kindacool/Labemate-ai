# Architecture

## Principle

Use a **modular monolith**.

This project is intentionally small. Do not create microservices or a complicated backend.

The architecture should still have clean boundaries so the code is easy to maintain.

## High-level architecture

```text
                Next.js UI
                    │
                    ▼
              API /generate
                    │
                    ▼
           GenerationService
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   Lab Parser    AI Service   Template Service
       │            │            │
       └────────────┼────────────┘
                    ▼
             Code Executor
                    │
                    ▼
             Screenshot Service
                    │
                    ▼
             DOCX Generator
                    │
                    ▼
                 Download
```

## Suggested folder structure

```text
src/
├── app/
│   ├── page.tsx
│   └── api/
│       └── generate/
│           └── route.ts
│
├── components/
│   ├── lab-form/
│   ├── generation/
│   └── ui/
│
├── lib/
│   ├── generation/
│   │   └── generation.service.ts
│   ├── lab/
│   │   ├── lab-parser.service.ts
│   │   └── parsers/
│   ├── ai/
│   │   ├── ai.service.ts
│   │   └── prompts.ts
│   ├── execution/
│   │   ├── code-execution.service.ts
│   │   └── executors/
│   ├── screenshots/
│   ├── documents/
│   ├── templates/
│   ├── validation/
│   └── errors/
│
└── types/

templates/
├── air/
├── bahria/
└── nust/

tests/
```

Adjust the exact structure when implementing if a simpler organization is clearly better.

## Design patterns

Do not use patterns just for the sake of using patterns. Use them where they solve a real problem.

### Service Layer

`GenerationService` coordinates the complete workflow.

The API route should remain thin.

### Strategy Pattern

Use separate executor strategies:

```text
CodeExecutor
├── PythonExecutor
├── CppExecutor
├── JavaExecutor
└── UnsupportedExecutor
```

Start with Python.

### Adapter Pattern

Hide third-party services behind interfaces.

For example:

```ts
interface AIProvider {
  analyzeLab(input: string): Promise<LabAnalysis>;
  generateSolutions(input: LabAnalysis): Promise<GeneratedLab>;
}
```

This keeps the rest of the application independent from a specific AI SDK.

### Template Registry

Use a simple registry for university templates:

```ts
type University = "air" | "bahria" | "nust";
```

Adding a university later should mainly involve adding its template/logo and registry entry.

## Important separation

AI decides:

> What should be in the report?

Application code decides:

> How should the report look?

Therefore:

```text
AI
 ↓
Structured content
 ↓
DOCX renderer
 ↓
University template
```

Do not ask AI to generate the DOCX formatting.

## Keep it simple

Do NOT add:

- Database
- Authentication
- Redis
- Queues
- Microservices
- Event buses
- Complex agent frameworks
- Unnecessary repositories/interfaces
- Dozens of configuration files

A clean modular monolith is enough.
