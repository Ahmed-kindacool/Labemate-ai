"""Ported from src/types/lab.ts.

None of these are wired into the pipeline yet — same as in the original
repo, they exist so later phases (parser, AI adapter, executor, docx
generator) have an agreed shape to target.
"""

from enum import Enum
from typing import Optional

from pydantic import BaseModel


class LabTask(BaseModel):
    id: str
    description: str
    language: Optional[str] = None


class ParsedLab(BaseModel):
    title: Optional[str] = None
    raw_text: str
    tasks: list[LabTask]


class GeneratedTaskSolution(BaseModel):
    id: str
    description: str
    language: str
    filename: str
    code: str
    explanation: str


class GeneratedLab(BaseModel):
    lab_title: str
    objectives: list[str]
    tasks: list[GeneratedTaskSolution]
    conclusion: str


class ExecutionStatus(str, Enum):
    SUCCESS = "success"
    FAILED = "failed"
    TIMEOUT = "timeout"
    UNSUPPORTED = "unsupported"


class ExecutionResult(BaseModel):
    status: ExecutionStatus
    stdout: str
    stderr: str
    exit_code: Optional[int] = None
