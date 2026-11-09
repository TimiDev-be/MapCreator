<!-- Tech stack badges -->
<p align="center">
  <!-- Frontend -->
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/MapLibre_GL_JS-5-396CB2?style=flat-square&logo=maplibre&logoColor=white" alt="MapLibre GL JS" />
  <img src="https://img.shields.io/badge/maplibre--react--components-0.2-396CB2?style=flat-square&logo=maplibre&logoColor=white" alt="maplibre-react-components" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Sass-1.100-CC6699?style=flat-square&logo=sass&logoColor=white" alt="Sass" />
  <img src="https://img.shields.io/badge/Formik-2.4-2563EB?style=flat-square" alt="Formik" />
  <img src="https://img.shields.io/badge/Yup-1.7-0F172A?style=flat-square" alt="Yup" />
  <img src="https://img.shields.io/badge/jsPDF-4-E44D26?style=flat-square" alt="jsPDF" />
  <img src="https://img.shields.io/badge/html2canvas-1.4-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="html2canvas" />
  <img src="https://img.shields.io/badge/qrcode-1.5-000000?style=flat-square&logo=qrcode&logoColor=white" alt="qrcode" />
  <img src="https://img.shields.io/badge/GeoJSON-0.5-199900?style=flat-square" alt="GeoJSON" />
  <img src="https://img.shields.io/badge/React_Toastify-11-FFA500?style=flat-square" alt="React Toastify" />
  <img src="https://img.shields.io/badge/SVGR-5-2C3E50?style=flat-square&logo=svg&logoColor=white" alt="vite-plugin-svgr" />
</p>
<p align="center">
  <!-- Desktop / backend -->
  <img src="https://img.shields.io/badge/.NET-10-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt=".NET 10" />
  <img src="https://img.shields.io/badge/C%23-14-239120?style=flat-square&logo=csharp&logoColor=white" alt="C#" />
  <img src="https://img.shields.io/badge/WPF-Windows-0078D4?style=flat-square&logo=windows&logoColor=white" alt="WPF" />
  <img src="https://img.shields.io/badge/WebView2-1.0.4022-0078D4?style=flat-square&logo=microsoftedge&logoColor=white" alt="WebView2" />
  <img src="https://img.shields.io/badge/ASP.NET_Core-Minimal_API-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt="ASP.NET Core" />
  <img src="https://img.shields.io/badge/Inno_Setup-Installer-1F4E79?style=flat-square" alt="Inno Setup" />
</p>
<p align="center">
  <!-- Tooling -->
  <img src="https://img.shields.io/badge/ESLint-10-4B32C3?style=flat-square&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-3.9-F7B93E?style=flat-square&logo=prettier&logoColor=black" alt="Prettier" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white" alt="npm" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="MIT License" />
</p>

<br />

<p align="center">
  <img src="desktop/Assets/MapCreator.png" alt="MapCreator logo" width="120" />
</p>

<h1 align="center">MapCreator</h1>

<p align="center">
  <b>Open source map editor for Windows.</b><br />
  Draw lines, polygons and markers, write descriptions and export your map to PDF using your own HTML template.
</p>

<p align="center">
  <a href="https://github.com/TimiDev-be/MapCreator/releases/latest"><b>Download</b></a>
  ·
  <a href="#features">Features</a>
  ·
  <a href="#templates">Templates</a>
  ·
  <a href="#development">Development</a>
</p>

---

## Preview

![Workspace](assets/screenshots/workspace.png)

<details>
<summary><b>More screenshots</b></summary>

### Welcome page
![WelcomePage](assets/screenshots/welcomePage.png)

### Maps list page
![MapsListPage](assets/screenshots/mapsListPage.png)

### New map page
![NewMapPage](assets/screenshots/newMapPage.png)

### Data files page and template preview
![DataFilesPage](assets/screenshots/dataFilesPage.png) ![TemplatePreview](assets/screenshots/templatePreview.png)

### Settings panel
![MapSettings](assets/screenshots/mapSettings.png)

### Layers panel
![MapLayers1](assets/screenshots/mapLayers1.png) ![MapLayers2](assets/screenshots/mapLayers2.png)

> Disabled layers are scoped to a map style. Each map style a user adds to the workspace can have its own set of disabled layers, independent of other styles.

### Drawings panel
![MapDrawings](assets/screenshots/mapDrawings.png)

> Drawings shortcuts:
>
> - **Escape** equals to *close drawing*,
> - **Enter or double click on the map** equals to *finish drawing*,
> - **Backspace** equals to *remove last draw point*

> Polygon with two points or line with one point won't create a new drawing.

### Description panel
![MapDescription1](assets/screenshots/mapDescription1.png) ![MapDescription2](assets/screenshots/mapDescription2.png)

### Combine drawings panel
![MapCombineDrawings](assets/screenshots/mapCombineDrawings.png)

> Combined drawings are not included on the map in template.

### Final product
Images of PDF pages:

![FinalProduct1](assets/screenshots/FinalProduct1.png) ![FinalProduct2](assets/screenshots/FinalProduct2.png)

</details>

## Features

- Draw, edit and delete lines, polygons and markers on the map
- Add descriptions to your maps
- Import custom HTML templates (see [Templates](#templates))
- Fill textarea and input fields directly within templates
- Export templates to PDF
- Add and edit your own map style URL
- Work with many map styles
- Disable map layers, scoped to the map style
- Import and export your data
- Built-in auto-update (checks GitHub Releases on startup)

## Installation

Download and run the installer from the [latest release](https://github.com/TimiDev-be/MapCreator/releases/latest).

> **Requirements:** Windows 10 or later. The installer downloads the WebView2 runtime automatically if it is missing.

### Where your data lives

Everything is stored locally in `%LocalAppData%\MapCreator`:

| File | Content |
| --- | --- |
| `data.json` | maps and templates |
| `styles.json` | your map styles |
| `logs/` | application logs |

> Back up `data.json` before updating or reinstalling.

## Architecture

```
┌──────────────────────────── Desktop (WPF) ────────────────────────────┐
│                                                                       │
│   WebView2 ──► React app (Vite build, served from wwwroot/dist)       │
│       ▲                          │                                    │
│       │                 HTTP API / WebSockets                         │
│       │                          ▼                                    │
│       └───────────── ASP.NET Core Minimal API (embedded)              │
│                                  │                                    │
│                          DataService / StyleService                   │
│                                  ▼                                    │
│                      %LocalAppData%\MapCreator\*.json                 │
└───────────────────────────────────────────────────────────────────────┘
```

## Development

**Requirements:** [.NET 10 SDK](https://dotnet.microsoft.com/download), [Node.js](https://nodejs.org/) and npm.

```bash
git clone https://github.com/TimiDev-be/MapCreator.git
cd MapCreator/desktop
dotnet run
```

The desktop project builds the React frontend automatically (`npm install` + `npm run build` in `client`) and copies it to `wwwroot/dist`.

To work on the React app in dev mode, keep the desktop app running (it provides the HTTP server) and start Vite:

```bash
cd client
npm install
npm run dev
```

To change the application's localhost port, edit `config.json` in `client/public`:

```json
{
  "api": {
    "link": "http://localhost:5550/api",
    "port": 5550
  },
  "websockets": {
    "link": "ws://localhost:5550"
  }
}
```

Useful scripts (in `client`):

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | production build |
| `npm run lint` | ESLint |
| `npm run preview` | preview the production build |

## Templates

You can build your own **HTML** templates. Example:

```html
<!-- class "template" is required (width/height is in pixels -> a4 format in 96dpi) -->
<div class="template" style="width: 793px; height: 1122px; padding: 20px;">
  <!-- class "page" is required to define each page even if you want only one -->
  <div class="page" style="width: 100%; height: 100%;">
    <!-- id "map-container" is required if you want to display the map -->
    <div id="map-container" style="width: 500px; height: 300px; padding: 10px; display: flex; justify-content: center; align-items: center;"></div>
    <!-- id "qrcode" is required if you want to display the QR code for Google Maps -->
    <div id="qrcode" style="width: 200px; height: 200px; padding: 10px;"></div>
    <div class="description-container" style="width: 500px; height: max-content; padding: 10px;">
      <h3>Description</h3>
      <!-- All textareas and inputs get listeners when the template is loaded, so values are saved to the map description. -->
      <textarea name="description" id="description-textarea" style="width: 100%; height: 100px; resize: none; font-size: 16px"></textarea>
    </div>
  </div>
</div>
```

The `name` of each textarea / input is used as a key in the `values` object of the map description:

```ts
map: any {
  ...prevmap,
  description: {
    ...prevmap.description,
    values: Record<string, string> = {
      "description": "some text"
    }
  }
}
```

## License

This project is licensed under the [MIT License](LICENSE).
It was made possible thanks to the open-source packages listed in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
