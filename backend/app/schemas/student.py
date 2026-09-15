from pydantic import BaseModel, field_validator

from app.domain.university import University


class StudentInfo(BaseModel):
    """Ported from `StudentInfoSchema` (Zod) in
    src/lib/validation/generate-request.schema.ts.

    Field names follow the snake_case form contract from the migration spec
    (name, roll_number, class_section, instructor_name, course) rather than
    the original camelCase JS field names.
    """

    name: str
    roll_number: str
    university: University
    class_section: str
    instructor_name: str
    course: str

    @field_validator("name", "roll_number", "class_section", "instructor_name", "course")
    @classmethod
    def not_blank(cls, value: str, info) -> str:
        # Ported from Zod's `.trim().min(1, "<Field> is required")` checks.
        trimmed = value.strip()
        if not trimmed:
            field_label = info.field_name.replace("_", " ").capitalize()
            raise ValueError(f"{field_label} is required")
        return trimmed
