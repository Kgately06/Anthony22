# Memory App Template

A reusable memory-card web app template you can personalize for any purpose (romantic gift, family memories, birthdays, graduations, friendship highlights, or anything else).

## What This Template Includes

- Interactive flip cards with photos on the front and memory text on the back
- Simple direct configuration in `script.js`
- Optional audio support:
  - one optional global song for all cards
  - or an optional song per memory card

## Quick Start

1. Put your image files in this project folder.
2. (Optional) Put audio files in this project folder.
3. Open `index.html` in a browser.
4. Edit the `pageConfig` object at the top of `script.js`.
5. Refresh the browser tab.

## Quick Edit Guide

Open `script.js` and update only the `pageConfig` object:

- `pageTitle`: browser tab title
- `headerTitle`: main headline on page
- `subtitle`: line under the headline
- `footerText`: text at bottom
- `globalSong`: optional default song path/URL
- `memories`: list of cards
  - `image`: local filename or URL
  - `title`: card title
  - `description`: card text (`<br>` supported)
  - `song`: optional song path/URL for that card

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
