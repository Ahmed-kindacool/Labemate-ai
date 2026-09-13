# Templates + UI

## University templates

There are exactly three templates in the MVP:

```text
templates/
├── air/
│   ├── template.docx
│   └── logo.png
├── bahria/
│   ├── template.docx
│   └── logo.png
└── nust/
    ├── template.docx
    └── logo.png
```

The three templates should have the **same layout and formatting**.

The logo/branding is the only intended university-specific difference.

## Critical requirement

The selected university should NOT be inserted into the report as ordinary text.

For example, do not do:

```ts
report.addText("Air University");
```

Instead:

```ts
university: "air"
```

selects the Air template/logo.

The same applies to Bahria and NUST.

## Template placeholders

The template may contain placeholders such as:

```text
{{STUDENT_NAME}}
{{ROLL_NUMBER}}
{{CLASS_SECTION}}
{{INSTRUCTOR_NAME}}
{{COURSE}}
{{LAB_TITLE}}
{{OBJECTIVES}}
{{TASKS}}
{{CODE}}
{{OUTPUT_SCREENSHOT}}
{{CONCLUSION}}
```

Use whichever placeholder approach is most reliable for the chosen DOCX library.

## UI

The application should be a polished single-page tool.

### Header

- Product name
- Short description

No login.

### Main form

Fields:

- Student Name
- Roll Number
- University
- Class / Section
- Instructor Name
- Course
- Lab file

### CTA

`Generate Lab Report`

### Progress

Show a simple progress state:

```text
✓ Lab uploaded
✓ Lab analyzed
→ Generating solution
○ Running code
○ Creating report
```

### Result

Show:

- Success message
- Download button
- Start another report

## Visual style

Aim for:

- Clean
- Modern
- Professional
- Minimal
- Responsive
- Accessible

Do not make the product look like a generic AI chat application.

## Accessibility

- Proper labels
- Keyboard navigation
- Visible focus states
- Useful validation errors
- Good contrast
- Loading states
