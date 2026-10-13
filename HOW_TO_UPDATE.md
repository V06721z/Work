# How to update this portfolio

Nearly all text and links live in `content.js`. Keep its commas and quotation marks intact when editing it.

## Add a project

Open `content.js`, find `"projects"`, and duplicate one complete project object. Update its title, type, date, problem, action, result, and tags. Put a comma between project objects.

Use `[NEEDS INFO: ...]` for any result that has not been confirmed. Do not estimate metrics.

### Attach a project PDF

1. Put the PDF in `assets/projects/`, using a short filename such as `blinkit-case-study.pdf`.
2. Find that project in `content.js`.
3. Change `"artifact": null` to `"artifact": "assets/projects/blinkit-case-study.pdf"`.
4. The project card will automatically show an active **Download case study** button.

Leave `artifact` as `null` until the PDF is uploaded so visitors never encounter a broken link.

## Add a job

Open `content.js`, find `"experience"`, and duplicate one complete role object. Update the company, role, dates, location, and bullets. Write bullets as action plus outcome whenever the evidence is available.

## Change the photo

Replace `assets/vihal-rotti-headshot.webp` with another image using the same filename. A vertical 4:5 image works best. If the filename changes, update `person.headshot` in `content.js`. Also update `person.headshotAlt` with a short visual description.

## Swap the résumé

Replace `assets/vihal-rotti-resume.pdf` with the new PDF using the same filename. The existing buttons will update automatically.

## Change contact links or text

Edit the `person`, `hero`, `about`, or `contact` sections in `content.js`. Layout and styling live in `index.html` and `styles.css` and usually do not need changes.

## Preview locally

You can now double-click `index.html` to open the site directly. For a closer match to deployed hosting, run a small local server:

```bash
cd /workspace/Work
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Publish free on GitHub Pages

1. Commit and push these files to your GitHub repository.
2. Open the repository on GitHub and select **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your main branch and the root folder, then save.
5. GitHub will show the public site address after deployment finishes.

Netlify and Vercel can also deploy this folder directly with no build command.
