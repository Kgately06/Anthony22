# Memory App Template

A reusable memory-card web app template you can personalize for any purpose (romantic gift, family memories, birthdays, graduations, friendship highlights, or anything else).

## What This Template Includes

- Interactive flip cards with photos on the front and memory text on the back
- Built-in **Template Editor** (no-code customization in the browser)
- Direct code-based configuration in `script.js` (for advanced editing)
- Optional audio support:
  - one global song for all cards
  - or an optional song per memory card
- Local persistence with browser `localStorage` so saved edits survive refresh

## Quick Start

1. Put your image files in this project folder.
2. (Optional) Put audio files in this project folder.
3. Open `index.html` in a browser.
4. Click **Open Template Editor** and customize your content.
5. Click **Save Template**.

## No-Code Customization (Recommended)

Use the editor in the page to:

- Set browser tab title, heading, subtitle, and footer text
- Add memory cards
- Edit image path, card title, and description
- Add optional song path per memory
- Set an optional global song
- Remove memories
- Save your template
- Reset back to default content
- See inline required-field warnings update as you type

## Code-Based Customization

If you prefer editing in code, update `defaultTemplateConfig` in `script.js`.

Main fields:

- `pageTitle`
- `headerTitle`
- `subtitle`
- `footerText`
- `globalSong` (optional)
- `memories[]` with:
  - `image`
  - `title`
  - `description` (supports `<br>` line breaks)
  - `song` (optional per memory)

Note: if you already saved data in the editor, the browser uses saved `localStorage` content first. Use **Reset to Defaults** to return to `defaultTemplateConfig`.

## Song Behavior

When a card is clicked:

- if that memory has its own `song`, it plays
- otherwise, `globalSong` plays (if set)
- if neither exists, no audio plays

Each new song selection stops any currently playing track first.

## Media File Guidance

- For local files, use relative names such as `IMG_8835.jpeg` or `song.mp3`.
- You can also use full URLs for hosted images/audio.
- Keep filenames exact, including capitalization.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

No build tools or external backend required.
