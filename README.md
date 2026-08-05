# Voltz RPP Startup Checklist

**Offline-capable field commissioning form** for Raptor Power Systems / Voltz Remote Power Panels (RPPs).

## Features
- Works completely offline (open `index.html` in any browser)
- Auto-saves as you type (localStorage)
- Optimized for phone, tablet, and laptop
- High-contrast industrial design matching voltzpwr.com
- Excellent print-to-PDF output
- Export as JSON for records

## How to Use
1. Copy this folder to your device (phone, tablet, or laptop).
2. Open `index.html`.
3. Fill out the form — it saves automatically.
4. Tap the yellow **Print to PDF** button.
5. Save the PDF into the `submissions/` folder.

## File Structure
- `index.html` – The checklist form (or use the single-file version)
- `styles.css` – Dark industrial styling (Voltz branded)
- `script.js` – Auto-save, print, and export logic
- `voltz-logo.png` – Official logo
- `submissions/` – Place printed PDFs here

## Print Tips
- Use "Print to PDF" for best results.
- The PDF filename will include serial number and date when possible.
- Print settings: A4 or Letter, portrait, default margins.

## Development & Deployment

### Git Setup (using env file)
1. Copy `.env.example` → `.env` and fill in your values:
   ```
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   GITHUB_REPO=yourusername/voltz-rpp-checklist
   ```
2. `.env` is already ignored by git (see `.gitignore`).

3. Set the remote using the token (example command):
   ```bash
   source .env
   git remote add origin https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git
   git branch -M main
   git push -u origin main
   ```

After the first push with the token, the credential helper (store) will cache it for future pushes on this machine.

### Netlify Deployment
- Recommended: Deploy the single-file version (`Voltz-RPP-Startup-Checklist-Single.html` renamed to `index.html`).
- Or point Netlify at the clean `voltz-rpp-checklist-deploy` folder.
- Add a `netlify.toml` (already present in the root for convenience).

## Notes
- This is a standalone tool for Voltz / Raptor Power Systems field use.
- Do not mix with other projects.

Voltz Power Distribution | A Raptor Power Brand
