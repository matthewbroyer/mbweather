# mbweather.online release notes

## v1.4 (2026-10-09): Modern look, new brand art, strip scroll fix

**Look and feel**
- Overview hero is now a layered sky: its own gradient and art for clear day (sun glow), clear night (moon glow and stars), cloud, rain, snow, storm and fog. Grey skies get a deeper shade at night. Frosted glass tiles for wind, humidity, UV and sunset. Larger, lighter temperature. CSS only, no images, no animation.
- Weather icons now use gradients (warm sun, soft cloud, moon, lightning). Rain drops and snow dots are lighter so they read on dark skies.
- Softer cards (20 px corners), frosted app bar, page background glow, gradient primary buttons, pill activity chips, gradient tab underline, rounded temperature bars. Light and dark both updated. Text contrast checked (hero tiles 5:1 or better).
- "Next 24 hours": bigger icons, highlighted "Now" chip, soft fade on the side that has more hours.

**Brand art (all original)**
- New logo and favicon: azure-to-cyan badge, warm sun, frosted cloud, faint isobar lines. `favicon.svg` is the master. Rendered from it: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon.ico`.
- New `og-image.png` (1200x630) and link-preview tags (Open Graph and Twitter large card) in `index.html`. They point to `https://mbweather.online/`. Change that address in the head of `index.html` if the site lives elsewhere.
- Manifest colours updated.

**Overview order**
- Alerts, Today, Next 24 hours, Details, What are you doing today?, 10-day forecast. "Observed now" is removed, and the app no longer asks the National Weather Service for station observations.

**Fix**
- Settings, Data and the search dropdown opened underneath the weather card. The app bar's frosted blur trapped them; the blur is gone and the bar now stacks above the page.
- "Next 24 hours" strip: the hour row was a second scroll container nested inside the scroller, which can swallow swipes on some phones. It is now a single scroller. Tested with simulated touch swipes in headless Chromium at 320, 390 and 820 px wide. Not tested on a real phone, Safari or an installed app.

**Known limits**
- Not tested in Safari, Firefox or on a real device. Tested in headless Chromium with a mocked forecast.
- Link-preview sites cache images. After uploading, use each site's debugger to refresh a stale preview.

## v1.3 (2026-10-05)
- Today card is quieter: smaller summary, two "Changing" rows at most, one line for best time. The long score explanation is a hover tip.
- Settings, Install app card now always shows. With no install button available it tells you what to do instead of hiding.
- Map libraries and boundary data are self-hosted in `vendor/`. No CDN requests, CSP tightened, Map tab files are cached so the outline map works offline. Street map and radar still need a connection.
- New Driving activity (flags snow or freezing rain, cold, heavy rain, gusts, low visibility; no road-condition data).
- Help section in About (install, offline, alerts).
- Clear all data now also removes the app-file cache.
- Hosting: `_headers` (Netlify, Cloudflare Pages), `.htaccess` (Apache). No manual cache-version bump is needed: updates are picked up automatically.

## v1.2 (2026-10-05): Install as app, action layer, compact Plan strip

**Install as app and offline**
- New Install card in Settings. Chrome, Edge and Android show an "Install Weather" button that opens the browser's install dialog. iPhone/iPad show "tap Share, then Add to Home Screen". The card disappears once installed.
- Installed app is named "Weather" (manifest name and short name), opens full screen, with new icons (192, 512, maskable 512, 180 Apple touch icon) made from the existing logo.
- Service worker (`sw.js`): network-first for the app's own files, cache as the offline fallback. It never touches weather APIs, map tiles or CDNs, and ignores non-GET requests. Bump `VERSION` in `sw.js` whenever any app file changes.
- With no signal the app opens and shows the last saved forecast if it is under 24 hours old (it used to be 2 hours). Current conditions in a saved copy are rebuilt from the hourly row for now, not the old "current" block.
- CSP now allows `manifest-src 'self'`, `worker-src 'self'`, and `'self'` images.

**Page titles**
- Browser tab titles are now "Weather | Overview", "Weather | Hourly", "Weather | Map", "Weather | Plan", "Weather | Compare", "Weather | Field & air", plus "Weather | Setup" and "Weather | About".

**Action layer (Overview)**
- Today card now leads with "Will I get rained on?" (minutes-level countdown from the 15-minute data when available, hourly otherwise) and an Outdoor score (0-100, daylight stretch) with a one-line reason.
- "What's changing": wind pick-up, big temperature swings, frost or freeze, and storms or snow in the next few days.
- "What are you doing today?": pick an activity (chips, plus a More list) and get GO / MARGINAL / NO-GO, the best daylight windows for the next 24 hours, and what limits it. Uses the same limits as the Plan tab. New presets: Washing the car, Fire pit.
- Plain-language notes on Wind, Humidity and UV tiles. Observed now moved below the 10-day forecast.

**Plan tab**
- The 72-hour strip is now one compact row per day (no horizontal scrolling, fits a phone). Tap or drag across it to check an hour. Dark hours are grey instead of red.
- "NO-GO" no longer wraps onto two lines.
- Removed "Best days this week: activity scores".

**Known limits**
- The install dialog itself, iOS, real phones and screen readers were not tested. Tested in headless Chromium with a mocked forecast.
- The Map tab still needs a connection (map libraries load from CDNs).

## v1.1 (2026-10-01): Utility theme and backups

**Look and feel**
- New "Utility" desktop-software theme shared with the other apps: solid app bar, underline tabs, square panels (6 px / 4 px radii), flat sky card, system font only, no animations over 120 ms.
- New accent: raspberry (#b0225a light, #f08ab0 dark), not used by any other app. Weather colors (rain blue, warm orange, go/caution/no-go) are unchanged.
- Mobile (860 px and under) gets a bottom navigation bar. In Pro view, Compare and Field & air sit under "More".
- Light/dark is now a switch in the header (replaces the Appearance dropdown). The app always opens in light and only opens dark if you chose dark last time. "Match device" is gone; older saved "auto" settings open in light.
- New logo and favicon: raspberry square badge with a gold sun behind a white cloud, matching the other apps' badges. The favicon is a simplified version (no rays) so it stays readable at 16 px. Both are embedded in the page. Standalone copies are in `brand/` (SVG, plus 180 and 512 px PNG).

**Map**
- Removed the Simple / Street detail buttons. The Map tab now always starts with the street map. If the street map can't load (no connection, no WebGL, or OpenFreeMap unreachable), it switches to the simple outline map for that visit and shows a note. It tries the street map again next time.
- Privacy: OpenFreeMap is now contacted whenever the Map tab opens, not only if you chose Street detail. About, AUDIT.md and ATTRIBUTIONS.md are updated. The old saved map-style setting is ignored.

**Data and backups**
- New Data menu in the header: Save backup now (Ctrl/Cmd+S), Export All (JSON)…, Import Backup (JSON)…, Export Forecast (CSV)…, Clear all data….
- You choose where backups go. The browser's save dialog opens the first time, and the app remembers that file. Save backup now then overwrites it in one click, with no new download each time.
- Import opens in the folder you saved to.
- Export Forecast (CSV) saves the hourly forecast (next ~10 days) for Excel or Sheets. Once you have chosen a CSV file, Save backup now refreshes it too. The CSV cannot be re-imported. JSON is the real backup.
- "Backed up last" chip next to the Data button: "Never backed up" or "Backed up 3 days ago". It turns amber after 7 days, or when you have a home set and no backup yet. On phones it becomes a small amber dot on Data.
- Browsers without file-location support (Firefox, Safari, phones) save a dated file to Downloads instead, and the menu says so.
- The old "Your data" buttons in Settings, Advanced moved into the Data menu. Clear all data also forgets the saved file locations. It never deletes backup files you saved.
- First-run screen now asks Light or Dark and has an "Import it" link for an existing backup.

**Privacy notes**
- The app now stores a reference to your backup file (not its contents or path) in the browser's IndexedDB, plus the time of your last backup in local storage. Both are listed in About and removed by Clear all data.
- No new network requests, services or libraries.

**Known limits**
- Save-location needs a browser with the File System Access API (Chrome, Edge, Opera and similar). Browsers show only the file name, never the full folder path.
- Not tested on real phones, in Safari or Firefox, or with a screen reader. Tested in headless Chromium with a mocked forecast.
