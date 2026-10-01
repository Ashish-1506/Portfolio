# Ashish Ranjan Portfolio

Personal developer portfolio built with React 18, Vite, Tailwind CSS v4, Framer Motion, and EmailJS.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

Set `VITE_BASE` when the site is deployed under a GitHub Pages repository path. EmailJS values belong in a local `.env` file based on `.env.example`.

## EmailJS setup

Copy `.env.example` to `.env`, then fill in the EmailJS service ID, template ID, and public key. The EmailJS template must accept `from_name`, `from_email`, `subject`, and `message` variables. Keep `.env` local and never commit its values.

The social preview artwork is provided as `public/og-image.svg` at 1200x630. Export it to PNG with any SVG-capable image editor or with ImageMagick: `magick public/og-image.svg public/og-image.png`, then update the `og:image` and `twitter:image` URLs if the PNG is published.

## Deployment

GitHub Pages deployment is automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It builds with `VITE_BASE=/Portfolio/`, publishes the `dist` directory, and deploys on pushes to `main` or manual workflow runs. Public assets use the Vite base path, so resume downloads, images, fonts, favicon files, the manifest, and the SPA fallback work at the repository sub-path.

### First-time setup

1. Create an empty public repository named `Portfolio` under the `Ashish-1506` GitHub account. Do not add a README, `.gitignore`, or license during creation.
2. In the local project terminal, run:

	```bash
	cd C:\Users\ASHISH\Desktop\Portfolio
	git init -b main
	git add .
	git commit -m "Initial portfolio"
	git remote add origin https://github.com/Ashish-1506/Portfolio.git
	git push -u origin main
	```

3. In GitHub, open `Portfolio` -> `Settings` -> `Pages`, set `Source` to `GitHub Actions`, and save.
4. In `Portfolio` -> `Settings` -> `Secrets and variables` -> `Actions`, select `New repository secret` and add:
	- `VITE_EMAILJS_SERVICE_ID`
	- `VITE_EMAILJS_TEMPLATE_ID`
	- `VITE_EMAILJS_PUBLIC_KEY`
5. Open the `Actions` tab and wait for `Deploy to GitHub Pages` to complete. The live URL is:

	`https://Ashish-1506.github.io/Portfolio/`
