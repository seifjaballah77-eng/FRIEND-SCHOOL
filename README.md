# FRIEND SCHOOL

**A free, responsive learning workspace for students everywhere.**

FRIEND SCHOOL starts with an Arabic-first interface and a practical set of working study tools. It is a static web app that can be hosted on GitHub Pages.

## Included in this first build

- Responsive dashboard and sidebar navigation for desktop and mobile.
- Course discovery with subject, country, and level filters.
- Starter learning paths with introductory lesson content.
- Interactive five-question quiz with explanations and score tracking.
- Flashcards: flip, add, and rate cards.
- Study planner: add, complete, filter, and delete tasks.
- Notes: create, edit, save, and delete notes.
- Focus timer with 25-minute and break presets.
- Calculator with a guarded arithmetic parser (no eval).
- Basic distance and mass unit conversion.
- Three small educational games: memory matching, arithmetic, and vocabulary.
- Knowledge library with search and category filters.
- Arabic, English, and French interface labels.
- Dark/light appearance, local data export, and local data clearing.
- Country and territory selector covering all 249 ISO 3166-1 alpha-2 entries in the bundled country dataset.
- PWA manifest and service worker for offline use after the first successful load.

## Publish with GitHub Pages

1. Open the repository **Settings**.
2. Select **Pages** from the sidebar.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**, then save.
5. Open the URL GitHub Pages displays after deployment.

The app is static: no server, paid API, or account is required.

## Important scope notes

This is a functioning starter release, not yet a complete worldwide curriculum database. The country selector and starter lessons are discovery scaffolding, not official curriculum coverage. Official syllabi, grade-by-grade lesson maps, translated content, exercises, media, and citations must be added country by country using approved and verifiable educational sources.

There is no AI tutor, cloud account, cross-device synchronization, or full offline download library in this version. The interface is currently translated into Arabic, English, and French; other languages remain planned. No external AI API or paid service is used.

## Data and privacy

Tasks, notes, flashcards, profile preferences, and progress are stored in the browser's local storage on the current device. Clearing browser storage or using another browser/device will not preserve that data. Use **Settings → Export my data** before clearing browser data.

## Project structure

- `index.html` — application layout
- `styles.css` — responsive visual system
- `app.js` — interactions, course seed data, and local persistence
- `manifest.webmanifest` — installable app metadata
- `sw.js` — offline cache
- `icon.svg` — app icon

## License

Add a license file before accepting external contributions.

## Country list data
The bundled `countries.json` is derived from the datasets/country-list project, which republishes ISO 3166-1 alpha-2 names and codes. It includes countries and territories; it does **not** mean that official school curricula for all listed places are already included.
Source: https://github.com/datasets/country-list (data file: https://raw.githubusercontent.com/datasets/country-list/main/data.csv).


## Tunisian curriculum data

The application includes `curriculum-tn.json`, adapted from the **Tunisian Official Curriculum** dataset by Israaelhouch (2026), licensed under **CC BY 4.0**. The reference provides official subject lists and chapter titles from CNP textbook contents. The app groups chapter titles into three suggested terms for browsing; this is not a ministry-issued term calendar. Subjects without chapter lists are shown with clearly labelled suggested learning focuses. Source: https://huggingface.co/datasets/israa-elhouch/tunisian-official-curriculum
