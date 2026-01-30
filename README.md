# Darkwind

> **"Tailwind blows, Darkwind adapts."**

**Darkwind** is an auto-dark plugin for Tailwind CSS with zero-config inverted colors.
Write `bg-x-slate-200`, and get `slate-800` (or `700`) in dark mode automatically. The default palette has 11 steps
(50 → 950); `x-` classes invert those steps in dark mode.
Darkwind is rule-based, predictable, and configurable. It adapts dark mode colors using math, not hardcoded strategies.

## Get Started

### Installation

```bash
npm install darkwind
# or
pnpm add darkwind
# or
yarn add darkwind
```

### Configuration

Add it to your `tailwind.config.js`:

```js
module.exports = {
  darkMode: 'class', // Required for the plugin to work
  plugins: [require('darkwind')()],
}
```

## Examples

Now use the `x-` prefix:

```html
<html class="dark">
  <div class="bg-x-slate-100 text-x-slate-900">
    This card adapts to the wind.
  </div>
</html>
```

## Features

- **Drop-in prefix**: Use `x-` in front of default palette colors to get automatic dark equivalents.
- **Predictable mapping**: Math-based inversion across the 11 shade steps (50 → 950), with tunable offsets.
- **White/black handling**: Edge colors map into the shade spectrum via `edgeFamily`.
- **Opacity friendly**: Works with slash modifiers like `bg-x-sky-500/50`.
- **Tailwind v3/v4 compatible**: Works in both Tailwind v3 and v4.
- **VS Code Preview**: `x-` classes (e.g., `bg-x-sky-500/50`) show color previews in VS Code.

![VS Code color preview for x- classes](docs/images/vscode-color-preview.png)

## How it works

### 1) Supported Tailwind palette colors

Darkwind targets the default `tailwindcss/colors` palette only (custom colors are not included):

- Shade-based colors (e.g., `red-300`, `sky-700`)
- Edge colors (`white`, `black`)

### 2) Shade-based colors

For palette colors like `slate-100` or `gray-500`:

- Mirror at 500 (symmetric inversion).
- Apply `offset` by shifting the result by shade steps in this sequence:
  `50 → 100 → 200 → 300 → 400 → 500 → 600 → 700 → 800 → 900 → 950`
- Clamp to the ends of the sequence (and to `minShade` / `maxShade` if configured).
- Snap to the nearest valid shade (`50–950`, ties round up).

### 3) `white` / `black`

- Compute a virtual shade for `white`/`black`.
- If the result is within `50–950`, output `{edgeFamily}-{shade}`.
- If it falls outside, keep `white` or `black`.

### 📊 Showcase mapping examples (documentation only)

These are illustrative examples, not API options. Use numeric options instead.

| Example | symmetric (default) | modern | darker |
| :-----: | :-----------------: | :----: | :----: |
| offset | `0` | `1` (lighter) | `-1` (darker) |
| maxShade | `1000` | `950` | `1000` |
| minShade | `0` | `50` | `100` |
| **Mapping** |  |  |  |
| white | `black` | `gray-950`† | `black`† |
| 50 | `950` | `900` | `black` |
| 100 | `900` | `800` | `950` |
| 200 | `800` | `700` | `900` |
| 300 | `700` | `600` | `800` |
| 400 | `600` | `500` | `700` |
| 500 | `500` | `400` | `600` |
| 600 | `400` | `300` | `500` |
| 700 | `300` | `200` | `400` |
| 800 | `200` | `100` | `300` |
| 900 | `100` | `50` | `200` |
| 950 | `50` | `50` | `100` |
| black | `white` | `gray-50`† | `gray-100`† |
* † edgeFamily-applied value.

## Options

### `offset` (Number)

- Default: `0`
- Applied after symmetric inversion.
- Calculated in shade steps:
  - `1`: shift one step toward lighter shades (modern)
  - `0`: perfectly symmetric inversion
  - `-1`: shift one step toward darker shades
- Note: Although Tailwind shade numbers increase toward darkness, `offset` follows lightness semantics: `+` means
  lighter, `-` means darker.

### `minShade` (Number)

- Default: `0`
- Lower clamp for the result shade. The computed shade will not go below this value.

### `maxShade` (Number)

- Default: `1000`
- Upper clamp for the result shade. The computed shade will not go above this value.

### `edgeFamily` (String)

- Default: `'gray'`
- Used only when the input is `white` or `black`.
- This only applies when white or black are mapped into the shade spectrum.
- Since white/black have no shade, Darkwind computes a virtual shade. If the result falls within `50–950`,
  it becomes `{edgeFamily}-{shade}`.
  - Example: `white → gray-950`
  - Example: `black → gray-50`
- This option only applies to `white` and `black` in the default Tailwind palette.

### `prefix` (String)

- Default: `'x'`
- Changes the class name prefix (e.g., `my-slate-100`).

### `tailwindVersion` (Number)

- Default: `4`
- Set to `3` for Tailwind v3 projects so opacity modifiers like `/50` are supported.

### Defaults

Darkwind defaults to a symmetric, mathematically neutral inversion:

- offset: 0
- maxShade: 1000
- minShade: 0

### 🔧 Configuration Example (symmetric default)

```js
// tailwind.config.js
module.exports = {
  // ...
  darkMode: 'class', // Required for the plugin to work
  plugins: [
    require('darkwind')(),
  ],
}
```

For modern UI contrast, we recommend:

### 🔧 Configuration Example (modern)

```js
// tailwind.config.js
module.exports = {
  // ...
  darkMode: 'class', // Required for the plugin to work
  plugins: [
    require('darkwind')({
      offset: 1, // Modern inversion (default: 0)
      maxShade: 950, // default: 1000
      minShade: 50, // default: 0
    }),
  ],
}
```
