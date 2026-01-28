# Darkwind

> **"Tailwind blows, Darkwind adapts."**

**Darkwind** is a zero-config plugin that creates inverted dark mode colors.
Write `bg-x-slate-100`, and get `slate-800` (or `900`) in dark mode automatically. The default palette has 11 steps
(50 → 950); `x-` classes invert those steps in dark mode.
Darkwind is rule-based, predictable, and configurable. It adapts dark mode colors using math, not hardcoded strategies.

## Features

- **Zero Config**: Adds `x-` prefix to Tailwind palette colors automatically.
- **Rule-based Inversion**: Predictable, math-based shade mapping.
- **Transparency Support**: Works perfectly with opacity modifiers like `bg-x-blue-500/50`.
- **Tailwind v4 Ready**: Works seamlessly using pure CSS variables.

## Installation

```bash
npm install darkwind
# or
pnpm add darkwind
# or
yarn add darkwind
```

## Usage

Add it to your `tailwind.config.js`:

```js
module.exports = {
  darkMode: 'class', // Required for the plugin to work
  plugins: [require('darkwind')()],
}
```

Now use the `x-` prefix:

```html
<html class="dark">
  <div class="bg-x-slate-100 text-x-slate-900">
    This card adapts to the wind.
  </div>
</html>
```

## Options

### `offset` (Number)

- Default: `1`
- Applied after symmetric inversion.
- Calculated in 100-step units:
  - `1`: shift toward lighter shades (modern default)
  - `0`: perfectly symmetric inversion
  - `-1`: shift toward darker shades
- Note: Although Tailwind shade numbers increase toward darkness, `offset` follows lightness semantics: `+` means
  lighter, `-` means darker.

### `minShade` (Number)

- Default: `50`
- Lower clamp for the result shade. The computed shade will not go below this value.

### `maxShade` (Number)

- Default: `950`
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

## How it works

### 1) Supported Tailwind palette colors

Darkwind targets the default `tailwindcss/colors` palette only (custom colors are not included):

- Shade-based colors (e.g., `red-300`, `sky-700`)
- Edge colors (`white`, `black`)

### 2) Shade-based colors

For palette colors like `slate-100` or `gray-500`:

- Symmetric inversion: mirror around 500
- Apply offset: add `offset * 100` (positive values shift toward lighter shades)
- Clamp to `minShade` / `maxShade`
- Snap to the nearest valid shade (`50–950`, ties round up)

### 3) `white` / `black`

- If the input is `white` or `black`, Darkwind computes a virtual shade.
- If the result is in `50–950`, it outputs `{edgeFamily}-{shade}`.
- If the result is `white` or `black`, it keeps `white` or `black`.

### 📊 Showcase mapping examples (documentation only)

These are illustrative examples, not API options. Use numeric options instead.

| Example | modern (default) | symmetric | darker |
| :-----: | :-------------: | :-------: | :----: |
| offset | `+1` (lighter) | `0` | `-1` (darker) |
| maxShade | `950` | `1000` | `1000` |
| minShade | `50` | `0` | `100` |
| **Mapping** |  |  |  |
| white | `gray-950`† | `black` | `gray-900`† |
| 50 | `950` | `950` | `900` |
| 100 | `950` | `900` | `800` |
| 200 | `900` | `800` | `700` |
| 300 | `800` | `700` | `600` |
| 400 | `700` | `600` | `500` |
| 500 | `600` | `500` | `400` |
| 600 | `500` | `400` | `300` |
| 700 | `400` | `300` | `200` |
| 800 | `300` | `200` | `100` |
| 900 | `50` | `100` | `100` |
| 950 | `200` | `50` | `100` |
| black | `gray-50`† | `white` | `gray-100`† |
* † edgeFamily-applied value.

### 🔧 Example Configuration

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require('darkwind')({
      prefix: 'x', // Custom prefix (default: 'x')
      offset: 0, // Symmetric inversion
      minShade: 50,
      maxShade: 950,
      edgeFamily: 'gray',
    }),
  ],
}
```
