# Attributions and third-party services

Last reviewed: 2026-10-01. Licenses and terms below are from memory of the providers' published terms and were not re-verified online from the build environment. Re-check each link before launch.

| Service / library | Used for | Receives | Cookies / tracking | License / terms | Attribution | Needed to work? |
|---|---|---|---|---|---|---|
| Open-Meteo (api, archive, air-quality, marine, geocoding) | Forecasts, history, air quality, tides/waves, place search | Coordinates of the viewed place, search text, visitor IP | None known | Data CC BY 4.0. Free API is for non-commercial use | Required. Shown in footer and About dialog | Yes |
| US National Weather Service (api.weather.gov) | Alerts, station observations, written forecast and discussion | Coordinates, visitor IP | None known | US government data, public domain | Not required. Credited anyway | No (US only, optional) |
| NOAA CO-OPS (api.tidesandcurrents.noaa.gov) | Tide predictions | Station requests, visitor IP | None known | US government data | Not required. Credited | No |
| RainViewer (api.rainviewer.com, tilecache.rainviewer.com) | Radar tiles | Tile positions (viewed area), visitor IP | Unknown | RainViewer API terms (check current free-tier limits and attribution wording) | Credited in footer, About and map note | No (radar layer only) |
| OpenFreeMap (tiles.openfreemap.org) | Street base map (default; the app falls back to a simple outline map if it fails) | Tile positions (viewed area), visitor IP | None known | Free service. Data ODbL (OpenStreetMap), schema OpenMapTiles (CC BY 4.0) | Required. Shown on the map in street mode | No (optional) |
| Leaflet 1.9.4 (cdnjs.cloudflare.com) | Map | Visitor IP to CDN | CDN may log | BSD-2-Clause | Leaflet credit shown by the map control | Map only |
| MapLibre GL JS 5.24.0 (cdn.jsdelivr.net) | Vector street map | Visitor IP to CDN | CDN may log | BSD-3-Clause | Credit in About | Map tab (street map) |
| @maplibre/maplibre-gl-leaflet 0.1.4 (cdn.jsdelivr.net) | Leaflet bridge for MapLibre | Visitor IP to CDN | CDN may log | ISC | Credit in About | Map tab (street map) |
| topojson-client 3.1.0 (cdnjs.cloudflare.com) | Draws boundary data | Visitor IP to CDN | CDN may log | ISC | Credit in About | Map only |
| world-atlas 2.0.2 (jsDelivr) | Country outlines (Natural Earth) | Visitor IP to CDN | CDN may log | Natural Earth is public domain. Package ISC | Credit in About | Map only |
| us-atlas 3.0.1 (jsDelivr) | US state outlines (US Census) | Visitor IP to CDN | CDN may log | US Census data public domain. Package ISC | Credit in About | Map only |

Removed in this audit: Google Fonts (Instrument Sans, JetBrains Mono). The app now uses the visitor's system fonts. No font files are shipped.

Icons and weather symbols are drawn inline in the app's own code. No stock images, no icon libraries, no analytics, no ads, no payment or AI services.

No dependency is pinned with Subresource Integrity yet. See AUDIT.md, remaining actions.
