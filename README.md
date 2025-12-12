# projekti_LESII_Gr16 / AssistiveSense

AssistiveSense is an academic prototype designed to improve access to web content for people with visual impairments. It demonstrates simple, practical accessibility features and policy elements that together support social, ethical and legal requirements.

## Purpose
This prototype aims to reduce barriers faced by people with limited vision by offering visual and audio aids, privacy transparency, and reporting/appeal mechanisms. It is intended as a starting point for LESI-ICT project work and community testing.

## Key Features
- Adjustable text size and a high-contrast mode for better readability.
- Text-to-speech audio options to hear page content.
- Persistent user preferences to keep accessibility settings across visits.
- Transparency notice and data controls (download/delete) for user privacy.
- Reporting and appeal flows to address content or moderation concerns.

## Use Cases
AssistiveSense can be used at home, in schools, community centers, or health institutions to: help individuals read and understand online content, provide an audio alternative, and offer a transparent way to manage personal data.

## LESI-ICT Mapping
- Phase 1 (Research): Identifies visually impaired users as a disadvantaged population and documents their needs.
- Phase 2 (Ideation): Proposes accessible UI patterns and privacy/appeal workflows that respect users' rights.
- Phase 3 (Prototyping): Delivers a working prototype that includes privacy notices, reporting, and role-based controls.
- Phase 4 (Narratives): Supports documentation for introduction, background, prototype description, implementation, and maintenance planning.

## Installation / Local Testing
Open the project folder in a static web server or file browser; the project is plain HTML/CSS/JS. Example (using Python 3 simple server):

```powershell
cd "C:\Users\Admin\path...\projekti_LESII_Gr16"
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Next Steps
- Conduct user testing with local accessibility organizations.
- Add more explicit accessibility annotations and ARIA landmarks.
- Expand TTS options (voice selection and language controls).
- Prepare an IEEE-formatted reference list for LESI-ICT submission.

## License & Attribution
This is an academic project (2025). Use for educational purposes and attribute the original authors.

---

For more details, see `prototype_desc.txt` for a user-focused description in Albanian and the project HTML/CSS/JS files for implementation details.
