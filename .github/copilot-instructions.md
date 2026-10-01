# Ashish Ranjan Portfolio

## Project goals

Build a modern, premium, professional personal developer portfolio for Ashish Ranjan. It should impress software engineering, backend, and AI/ML recruiters quickly; remain a fast, accessible, SEO-friendly, responsive single-page site; and deploy for free to GitHub Pages through GitHub Actions.

## Tech stack

- React 18 with Vite, JavaScript/JSX only
- Tailwind CSS v4 through `@tailwindcss/vite`
- Framer Motion, `react-icons`, `react-type-animation`
- `@emailjs/browser` for the contact form without a backend
- Local `@fontsource-variable` packages for Inter, Space Grotesk, and JetBrains Mono

## Design tokens

- Dark theme by default with a light theme toggle
- Background `#0B0F1A`, surface `#121829`, primary indigo `#6366F1`
- Secondary violet `#A855F7`, accent cyan `#22D3EE`
- Text `#E5E7EB`, muted text `#94A3B8`
- Glassmorphism cards, subtle gradients, glowing hover effects, generous whitespace, and `rounded-2xl` corners

## Coding rules

- Use functional components and hooks only; one component per PascalCase file.
- Use semantic HTML, accessible labels and alt text, and preserve keyboard navigation.
- Respect `prefers-reduced-motion` for every animation; prefer transform and opacity.
- Keep code clean with no unused imports or dead code. Add comments only for non-obvious behavior.
- Never invent facts about Ashish. Use `TODO` for missing facts, links, assets, and credentials.
- The phone number is stored in data but must not be displayed publicly.
- Keep the site mobile-first, responsive, fast, and SEO-friendly.
- Verify `npm run dev` has no console errors after each task.

## Additional verified portfolio data

- Web Developer Intern at InAmigos: a 14-day internship. Dates, work bullets, and tech used remain `TODO` until supplied and must stay hidden in the UI.
- InAmigos completion certificate: `https://drive.google.com/file/d/1GaD0jFZ7yA7P5xJq-YoX9AcabvanGmBN/view?usp=sharing`
- InAmigos appreciation certificate: `https://drive.google.com/file/d/1-OaGfb8MdiQKmXYWgXVzkZZT49-xvtJH/view?usp=sharing`
- Class XII: Chinmaya Vidyalaya, Bokaro, 94.6%; year remains `TODO`.
- Class X: DAV Public School, Gaya, 95.8%; year remains `TODO`.
- Additional certifications: ISACA Cyber Security - Basics and Application; EduPyramids/SINE/IIT Bombay Java Training; EduPyramids/SINE/IIT Bombay Advanced C++ Training; NPTEL Conservation Economics with a 99% score.
- Do not add school percentages or the NPTEL score to Hero stats or SEO metadata.

## Data-file convention

All editable portfolio content, including text, links, skills, projects, experience, education, publications, certifications, and navigation labels, belongs in `src/data/*.js`. Components should consume those modules rather than hardcoding portfolio content. EmailJS values belong in environment variables based on `.env.example`; never commit `.env`.