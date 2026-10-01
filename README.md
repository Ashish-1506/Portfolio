# Ashish Ranjan Portfolio

Personal developer portfolio for Ashish Ranjan, a Computer Science undergraduate focused on full-stack development, backend engineering, AI/ML applications, and biomedical AI research.

**Live demo:** [Ashish Ranjan Portfolio](https://Ashish-1506.github.io/Portfolio/)

## Key Features

- Animated single-page presentation with reduced-motion support.
- Dark/light theme switching with persisted preference.
- Responsive layouts for mobile, tablet, and desktop.
- Accessible semantic structure, keyboard navigation, focus management, and command palette.
- SEO metadata, Open Graph preview artwork, sitemap, robots file, and web manifest.
- Contact form with EmailJS and a mailto fallback when local credentials are unavailable.
- GitHub Actions CI/CD deployment to GitHub Pages.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 18, JSX, Vite |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Icons | react-icons |
| Contact | @emailjs/browser |
| Fonts | Inter, Space Grotesk, JetBrains Mono |
| Quality | Oxlint, Vite production build |
| Deployment | GitHub Actions, GitHub Pages |

## Project Structure

```text
src/
  components/       Reusable layout, section, and UI components
  context/          Theme context and provider
  data/             Editable portfolio content
  hooks/            Shared React hooks
  utils/            Link and icon helpers
public/
  assets/           Profile and project images
  resume.pdf        Downloadable resume
.github/workflows/  GitHub Pages deployment workflow
```

## Getting Started

Requirements: Node.js 20 or newer and npm.

```bash
npm ci
npm run dev
```

Available checks:

```bash
npm run lint
npm run build
npm run preview
```

## Editing Portfolio Content

Update the modules in `src/data/` for profile details, navigation, skills, projects, experience, education, certifications, publications, and about-page content. Keep components focused on presentation and do not hardcode personal facts in them.

Place the resume at `public/resume.pdf`. Public images belong in `public/assets/images/` and should be referenced with the Vite base path for GitHub Pages compatibility.

## Environment Variables

Copy `.env.example` to `.env` for local EmailJS testing and fill in the values from the EmailJS dashboard:

```text
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Never commit `.env` or real credentials. The same three values must be added as GitHub repository Actions secrets for production contact-form delivery.

## Deployment

The workflow in `.github/workflows/deploy.yml` deploys the `main` branch to GitHub Pages. It builds with `VITE_BASE=/Portfolio/`, creates the SPA `404.html` fallback, and publishes `dist` through the official Pages actions.

To configure a new repository:

1. Create a public repository named `Portfolio` under `Ashish-1506`.
2. Push the `main` branch to `https://github.com/Ashish-1506/Portfolio.git`.
3. Set `Settings -> Pages -> Source` to `GitHub Actions`.
4. Add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` under `Settings -> Secrets and variables -> Actions`.

## Screenshots

Add recruiter-facing screenshots at these paths:

```text
docs/screenshots/desktop.png       Desktop layout
docs/screenshots/mobile.png        Mobile layout
docs/screenshots/dark.png          Dark theme
docs/screenshots/light.png         Light theme
```

## License and Contact

The code is released under the MIT License. See [LICENSE](LICENSE). For collaboration or professional opportunities, use the contact form on the portfolio or email Ashish Ranjan through the address published in the site data.
