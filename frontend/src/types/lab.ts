export interface LabTask {
  id: string;
  description: string;
  language?: string;
}

export interface ParsedLab {
  title?: string;
  rawText: string;
  tasks: LabTask[];
}

export interface GeneratedTaskSolution {
  id: string;
  description: string;
  language: string;
  filename: string;
  code: string;
  explanation: string;
}

export interface GeneratedLab {
  labTitle: string;
  objectives: string[];
  tasks: GeneratedTaskSolution[];
  conclusion: string;
}

export type ExecutionStatus = "success" | "failed" | "timeout" | "unsupported";

export interface ExecutionResult {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  exitCode?: number;
}

export type University = "air" | "bahria" | "nust";
