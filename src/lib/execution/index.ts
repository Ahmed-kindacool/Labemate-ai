import type { ExecutionResult } from '../../types/lab';

export interface CodeExecutor {
  execute(code: string): Promise<ExecutionResult>;
}

export class PythonExecutor implements CodeExecutor {
  async execute(code: string): Promise<ExecutionResult> {
    throw new Error("Not implemented: Secure Docker sandbox deferred to Phase 4");
  }
}
