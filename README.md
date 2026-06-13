# Harbour House Brand Showcase &amp; Governance Tool

| Metric | Metadata Value |
| :--- | :--- |
| **Version** | 1.0 |
| **Showcase Status** | Management Review |
| **Last Updated** | 13 June 2026 |
| **Approved By** | Pending Review |

This is a self-contained, interactive digital brand showcase for **Harbour House** (located at Ryde Marina, Isle of Wight). 

It functions as:
1. **Management Presentation:** Demonstrating brand guidelines dynamically.
2. **Staff Training Manual:** Onboarding team members on brand attributes, typography, and logo usage.
3. **Social Media Studio:** A toolkit for staff to simulate aspect ratios, safe text boundaries, and select pre-approved copy templates.
4. **Agency Handover Package:** Transferring visual assets and layout specifications to designers.

---

## Getting Started: Dual-Mode Execution

This application is designed to run in two distinct environments:

### 1. Recommended Mode (Local Web Server)
Running the application via an HTTP server enables the full dynamic experience, allowing the browser to parse local JSON files and use advanced clipboard tools without security restrictions.

**How to run:**
1. Open terminal/powershell inside this project directory.
2. Run a simple Python server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to: [http://localhost:8000](http://localhost:8000)

### 2. Basic Mode (Direct File Open)
You can open `index.html` directly in any web browser by double-clicking it.
* **Fallback System:** The application automatically detects `file://` mode and switches to loaded fallback data variables to bypass browser CORS constraints.
* **Notification Banner:** A warning banner is displayed at the top to remind users to start a local server for full functionality.

---

## Directory Structure

```text
harbour-house-showcase/
├── index.html            # Core structure (9 sections, semantic HTML5, SVG icons)
├── style.css             # Design system variables, responsive layouts, accessibility overrides
├── app.js                # Modular JS controllers, local storage state, fallback data
├── README.md             # This instructions document
├── data/
│   ├── images.json       # Asset registry manifest (Source, title, status, alt description)
│   ├── menu.json         # Menu categories, pricing, descriptions, and markers
│   ├── pairings.json     # Food & Drink pairing recommendations with approval states
│   └── captions.json     # Social caption copy examples (Preferred vs. Avoid copy)
├── assets/
│   ├── brand/            # Controlled master SVGs
│   │   ├── logo-primary.svg       # Vertical branding lockup
│   │   ├── logo-badge.svg         # Circular badge seal
│   │   ├── logo-monogram.svg      # Favicon / social profile avatar
│   │   └── building-elevation.svg # Architectural facade outline drawing
│   ├── icons/            # Reusable SVG line symbols
│   └── images/           # Category-based library folders
│       ├── reference/    # Authentic photography (menus, venue)
│       └── concepts/     # AI-generated campaign visualizations
└── docs/
    └── asset-register.md # Extended inventory of the 16 brand image assets
```

---

## Brand Governance Rules

### 1. Asset Classification Badges
Every image displayed carries a strict status tag:
* **Reference:** Authentic photography or existing physical menu assets.
* **Concept:** AI-generated or exploratory visualisations.
* **Proposed:** A design layout submitted for management review.
* **Approved:** Formally accepted assets ready for publication.

### 2. Typography Fallbacks
To handle offline use, we employ a resilient CSS stack:
* **Display Font:** `Playfair Display` &rarr; Fallback: `Georgia, 'Times New Roman', serif;`
* **Body/UI Font:** `Montserrat` &rarr; Fallback: `system-ui, -apple-system, sans-serif;`
* **Script Font:** `Caveat` &rarr; Fallback: `cursive;` (restricted to short decorative details like "by the sea").

### 3. High Contrast &amp; Reduced Motion Settings
At the bottom of the showroom, users can toggle:
* **High Contrast Mode:** Switches colors to absolute contrast ratios and overrides text sizing.
* **Reduced Motion:** Disables the slow zoom animation on the hero backdrop and other visual transitions.
* Settings are saved to the browser's `localStorage` and persist on page reloads.

---

## Customisation Guides

### How to Edit JSON Data Files Safely
Because all visual cataloguing, menus, pairings, and captions are loaded from JSON files (found in the `data/` folder), editing these files allows you to customize content without writing HTML or JS. 

> [!WARNING]
> **JSON Syntax Rules:**
> - Strings must be enclosed in double quotes (`"like this"`). Never use single quotes (`'like this'`).
> - Nested items must have correct comma separation.
> - **The Trailing Comma Rule:** The final item in an array or object must NOT end with a trailing comma. Including one will break the browser's JSON parser and cause loading errors.
> - You can check your edited JSON for errors by copying it into a free validator tool like [JSONLint](https://jsonlint.com/).

#### 1. Editing Menu Items and Prices
To change a price or description, open `data/menu.json`, find the item object, and update the `"price"` value (as a number, e.g. `20.0` or `8.50`, no currency symbols) and the description string. 

#### 2. Approving Proposed Items (e.g. Drink Pairings)
To change the status of an item (e.g. updating a proposed food-wine pairing to approved):
1. Open `data/pairings.json`.
2. Locate the pairing, and change `"status": "proposed"` to `"status": "approved"`.
3. If running in `file://` mode, repeat this update in the `FallbackData.pairings` array inside `app.js`.

#### 3. How to Add New Images
1. Copy the image into the corresponding folder inside `assets/images/concepts/` or `assets/images/reference/`.
2. Open `data/images.json`.
3. Add a new JSON object entry:
   ```json
   {
     "id": "concept-new-food",
     "src": "assets/images/concepts/food/new_food.jpg",
     "thumbnail": "assets/images/concepts/food/new_food.jpg",
     "title": "New Dish Presentation",
     "category": "food",
     "status": "concept",
     "alt": "Alt text description for screen readers.",
     "whyItWorks": "Explains why the framing aligns with brand rules.",
     "usage": ["instagram grid", "menu divider"]
   }
   ```
4. If running in direct `file://` mode, open `app.js` and paste the same object into `FallbackData.images`.

### Resetting Saved Data
To reset the compliance checklist ticks and accessibility settings, open the browser developer console (`F12`) and run:
```javascript
localStorage.clear();
location.reload();
```
