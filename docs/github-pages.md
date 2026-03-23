# GitHub Pages Setup

This project uses the `docs/` folder as a GitHub Pages source.

## Option A (Recommended): GitHub Actions Deployment

1. Push this repository to GitHub.
2. In GitHub repository settings, go to **Pages**.
3. Under **Build and deployment**, select **Source: GitHub Actions**.
4. The workflow file `.github/workflows/docs-pages.yml` will publish docs automatically.

## Option B: Branch + Folder Deployment

1. Go to **Settings > Pages**.
2. Set source to **Deploy from a branch**.
3. Select branch `main` and folder `/docs`.

## Docs Entry Point

- `docs/index.md`

## Local Preview (optional)

If you want to preview with Jekyll locally:

```bash
bundle exec jekyll serve --source docs
```

(Requires Ruby + Bundler/Jekyll installed.)
