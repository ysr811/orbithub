<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Git & Remote Push Guardrails

- **STRICT PROHIBITION:** NEVER execute `git push` or push changes to GitHub or any remote repository without explicit user instruction and prior approval.
- Staging (`git add`) and local commits (`git commit`) are permitted when instructed, but pushing to the remote branch must ALWAYS wait for explicit confirmation from the user (e.g., "ارفع الكود", "push to github").

## Strict Scope & Task Discipline (Zero Unsolicited Work)

- **Ask When Unsure:** If any requirement, data structure, or design detail is ambiguous, ALWAYS ask the user directly for clarification instead of guessing or assuming.
- **Strict Scope Boundaries:** NEVER implement extra features, premature refactoring, or unsolicited changes beyond the exact requested task. Do strictly and cleanly only what was asked.

## Code Quality & Simplicity (KISS & Zero Dead Code)

- **Keep code ultra-simple and high-performance:** Never add one-off migration logic, legacy key fallbacks, or temporary cleanup code that becomes dead weight after a single run. Write the minimal, cleanest solution that solves the problem.
- **Next.js Documentation Reference:** When implementing or debugging Next.js features, always consult `https://nextjs.org/llms.txt` for modern Next.js conventions and APIs.
- **Code Comments & Documentation in English ONLY:** All code comments, docstrings, variable names, and internal notes must STRICTLY be written in English. NEVER write Arabic in code comments. Arabic is exclusively reserved for student-facing UI strings rendered on screen.
- **React-Markdown v9+ Code Rendering Invariant:** In `react-markdown` (v9+), the `inline` prop on `code` components is completely removed. NEVER check `if (inline)`. Instead, handle code blocks using a dedicated `pre` component, and in `code`, distinguish inline spans by checking for the absence of newlines and language classNames (`!Boolean(className) && !children.includes('\n')`). Never inject `<pre>` or block-level card wrappers inside inline `<code>` components to prevent breaking paragraph flow and DOM nesting.

## Design System & UI Components

- **ALWAYS reuse existing UI primitives** from `@/components/ui/` (`Button`, `Card`, `Badge`, `Dialog`, `Input`, `Separator`, etc.).
- **NEVER build core UI elements from scratch** using raw HTML tags (`<button>`, `<div className="card">`, etc.) when a matching primitive exists in `@/components/ui/`.
- **Button Copy & Sizing Invariant:** Use concise, standard action labels (e.g., "التالي", "السابق", "تأكيد", "تخطي") instead of conversational sentences. In dialogs and wizards, keep buttons compact (`w-auto`) like desktop applications rather than stretching full-width.
- **Mobile Touch vs. Desktop Mouse Ergonomics Invariant:** On touch and mobile screens (< md), buttons and interactive targets must be generously sized (44px - 48px, e.g. `size-12` with `size-6` icons) because users navigate with thumbs and fingers. On desktop screens (md+), buttons and controls must scale down to compact, refined dimensions (36px, e.g. `md:size-9` with `md:size-4` icons) to match mouse cursor precision and prevent awkward, oversized elements. The same responsive scaling applies to typography.
- **Empty States (Borderless & Unboxed):** NEVER wrap empty states ("no results", "empty content") inside card boxes with white backgrounds (`bg-card`), heavy dashed borders, or pulsing glow rings. Empty states must sit naturally in the page flow (`bg-transparent`, no borders), featuring only a simple quiet icon, clean typography, and a single compact action button.
- **Modal Breathing Space & Margins:** Provide generous internal breathing room on desktop/tablet (`sm:max-w-xl md:max-w-2xl` with `p-8 sm:p-10`), while maintaining safe margins on mobile (`w-[calc(100%-3rem)]`) to keep the dialog centered without touching the screen edges.
- **Uniform Padding (Equal All Around):** Always use uniform padding across all four sides (`p-6 sm:p-8 md:p-9`) in dialogs and cards. NEVER mix unequal horizontal and vertical paddings (`px-*` vs `py-*`) which distorts alignment.
- **Natural Height & Zero Artificial Bottom Gaps:** Modals and dialogs must size to their natural content height (`h-auto`). Never set artificial stretching (`flex-1` with arbitrary `max-h`) that produces vacant white space between content and action buttons.
- **Strict Anti-AI Slop & Zero Emojis:** NEVER use emojis anywhere in site copy, headers, descriptions, buttons, or badges. Emojis degrade visual credibility into generic "AI slop". Rely strictly on clean typography, white space, and structured layout.
- **Official Academic Nomenclature (Zero Parenthetical Suffixes):** Always use the official, clean Arabic title "كلية الحاسبات وتقنية المعلومات" (Faculty of Computing and Information Technology). NEVER append redundant parenthetical acronyms such as "(CS & IT)", "(CS/IT)", or "(علوم حاسوب وتقنية معلومات)" next to the faculty name in site copy, headers, descriptions, or metadata.
- **Zero Fluff & No Redundant Confirmation:** Avoid gratuitous decorative icons (sparkles, stars, floating shapes) and redundant confirmation elements (e.g., re-displaying choices the user just picked). Keep cards confident, pure white, and distraction-free.
- **Filter Ordering & Pre-filled Defaults:** In filter panels where broad academic scope (e.g. Level, Semester) is pre-configured or saved in local storage, place the most specific, frequently changed criteria first (e.g. Subject, Instructor) at the top, and position the pre-set defaults (Semester, Academic Year) at the bottom.

## Naming & Storage Conventions

- **Clean & direct identifiers:** Do NOT prefix local storage keys, state variables, or internal constants with the project name (e.g., use `onboarding_completed`, `user_level`, `user_semester` instead of `orbithub_*`).

## Skill Creation Blueprint

When creating or revising an Agent Skill (`SKILL.md`), act as a Senior AI Agent Architect following this exact blueprint:
1. **YAML Frontmatter (`name` & `description`):** Kebab-case identifier and precise trigger conditions.
2. **Role & Objective:** Exact technical goal in max 2 lines.
3. **Execution Pipeline:** Deterministic pipeline: Inspect -> Plan -> Execute -> Validate.
4. **Hard Constraints & Guardrails:** Strict rules preventing hallucinations, scope creep, and anti-patterns.
5. **Expected Output Specification:** Exact deliverables and formatting.
