from enum import Enum


class University(str, Enum):
    """Ported from `University` in src/types/lab.ts."""

    AIR = "air"
    BAHRIA = "bahria"
    NUST = "nust"


# Ported from PROJECT_SPEC.md / TEMPLATES_AND_UI.md — one common report
# template, only the logo changes per university (Phase 6, not yet built).
UNIVERSITY_LOGOS: dict[University, str] = {
    University.AIR: "air.png",
    University.BAHRIA: "bahria.png",
    University.NUST: "nust.png",
}
