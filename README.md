# CodeGuardian AI — React UI prototype

A competition-ready frontend prototype for an AI code validation platform.

## Run

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## What is included
- Multi-language selector (18 languages)
- Code editor with line numbers
- Upload source files
- Validation workflow with loading state
- Diagnostics panel with errors/warnings
- AI Fix panel and suggested questions
- Code-health percentage ring and progress bar
- Before/after health concept for judge demos
- Responsive dark, high-contrast UI

## Important
This version is a frontend prototype. The diagnostics and AI responses are mocked so the UI can be demonstrated without a backend.

## Recommended production architecture
React frontend -> API gateway -> language execution sandbox -> static analyzers/linters -> AI service -> normalized diagnostics -> React UI.

Never execute untrusted uploaded code directly on the main server. Use isolated containers/VMs with CPU, memory, network, filesystem and execution-time limits.
