// src/index.js
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

const VALID_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const VALID_SHADE_SET = new Set(VALID_SHADES)
const VALID_SHADE_INDEX = new Map(VALID_SHADES.map((shade, index) => [shade, index]))

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function snapShade(value) {
  let closest = VALID_SHADES[0]
  let closestDiff = Math.abs(value - closest)

  for (let i = 1; i < VALID_SHADES.length; i += 1) {
    const shade = VALID_SHADES[i]
    const diff = Math.abs(value - shade)

    if (diff < closestDiff || (diff === closestDiff && shade > closest)) {
      closest = shade
      closestDiff = diff
    }
  }

  return closest
}

function shiftShadeBySteps(shade, offset) {
  const startIndex = VALID_SHADE_INDEX.get(shade)
  if (startIndex === undefined) return snapShade(shade)

  const shiftedIndex = startIndex + offset
  const clampedIndex = clamp(shiftedIndex, 0, VALID_SHADES.length - 1)
  const snappedIndex = Math.round(clampedIndex)

  return VALID_SHADES[snappedIndex]
}

function normalizeOptions(userOptions = {}) {
  const offset = Number.isFinite(userOptions.offset) ? userOptions.offset : 0
  let minShade = Number.isFinite(userOptions.minShade) ? userOptions.minShade : 0
  let maxShade = Number.isFinite(userOptions.maxShade) ? userOptions.maxShade : 1000
  const tailwindVersion = Number.isFinite(userOptions.tailwindVersion)
    ? userOptions.tailwindVersion
    : 4

  if (minShade > maxShade) {
    const temp = minShade
    minShade = maxShade
    maxShade = temp
  }

  const edgeFamily = typeof userOptions.edgeFamily === 'string' && userOptions.edgeFamily.trim()
    ? userOptions.edgeFamily.trim()
    : 'gray'
  const prefix = typeof userOptions.prefix === 'string' && userOptions.prefix.trim()
    ? userOptions.prefix.trim()
    : 'x'
  const previewFallback = userOptions.previewFallback !== undefined
    ? Boolean(userOptions.previewFallback)
    : true

  return {
    offset,
    minShade,
    maxShade,
    edgeFamily,
    prefix,
    previewFallback,
    tailwindVersion,
  }
}

function mapShade(shade, options) {
  const mirrored = 1000 - shade
  const shifted = shiftShadeBySteps(mirrored, -options.offset)
  const clamped = clamp(shifted, options.minShade, options.maxShade)
  return snapShade(clamped)
}

function mapEdgeColor(colorName, options) {
  const virtualShade = colorName === 'white' ? 0 : 1100
  const result = 1000 - virtualShade + options.offset * 100
  const clamped = clamp(result, options.minShade, options.maxShade)

  if (clamped < 50) return 'white'
  if (clamped > 950) return 'black'

  const snapped = snapShade(clamped)
  return `${options.edgeFamily}-${snapped}`
}

function buildColorMap(options) {
  const finalMap = {}

  finalMap[`${options.prefix}-white`] = {
    light: 'white',
    dark: mapEdgeColor('white', options),
  }

  finalMap[`${options.prefix}-black`] = {
    light: 'black',
    dark: mapEdgeColor('black', options),
  }

  Object.entries(colors).forEach(([family, value]) => {
    if (!value || typeof value !== 'object') return

    Object.keys(value).forEach((shadeKey) => {
      const shade = Number(shadeKey)
      if (!VALID_SHADE_SET.has(shade)) return

      const alias = `${options.prefix}-${family}-${shadeKey}`
      const darkShade = mapShade(shade, options)

      finalMap[alias] = {
        light: `${family}-${shadeKey}`,
        dark: `${family}-${darkShade}`,
      }
    })
  })

  return finalMap
}

function resolveCssValue(colorKey) {
  return `var(--color-${colorKey})`
}

function resolveThemeColor(theme, colorKey) {
  if (typeof theme !== 'function' || typeof colorKey !== 'string') return null
  if (colorKey === 'white' || colorKey === 'black') {
    return theme(`colors.${colorKey}`)
  }

  const parts = colorKey.split('-')
  if (parts.length < 2) return theme(`colors.${colorKey}`)

  const shade = parts.pop()
  const name = parts.join('-')
  const value = theme(`colors.${name}.${shade}`)
  if (value) return value

  const family = theme(`colors.${name}`)
  if (typeof family === 'string') return family

  return null
}

function resolveColorFallback(colorKey) {
  if (typeof colorKey !== 'string') return null
  if (colorKey.startsWith('#') || colorKey.startsWith('rgb(') || colorKey.startsWith('hsl(') || colorKey.startsWith('oklch(')) return colorKey
  if (colors[colorKey]) return colors[colorKey]

  const parts = colorKey.split('-')
  if (parts.length < 2) return null

  const shade = parts.pop()
  const name = parts.join('-')
  if (!colors[name] || !colors[name][shade]) return null
  return colors[name][shade]
}

function resolvePreviewFallback(colorKey, theme) {
  const themeValue = resolveThemeColor(theme, colorKey)
  if (themeValue) return themeValue
  return resolveColorFallback(colorKey)
}

module.exports = plugin.withOptions(
  (userOptions = {}) => {
    const options = normalizeOptions(userOptions)
    const finalMap = buildColorMap(options)

    return ({ addBase, theme }) => {
      const lightVars = {}
      const darkVars = {}

      Object.entries(finalMap).forEach(([alias, v]) => {
        if (!v || typeof v !== 'object') return
        if (typeof v.light !== 'string' || typeof v.dark !== 'string') return

        lightVars[`--${alias}`] =
          resolveThemeColor(theme, v.light) ||
          resolveColorFallback(v.light) ||
          resolveCssValue(v.light)
        darkVars[`--${alias}`] =
          resolveThemeColor(theme, v.dark) ||
          resolveColorFallback(v.dark) ||
          resolveCssValue(v.dark)
      })

      addBase({
        ':root': lightVars,
        '.dark': darkVars,
      })
    }
  },
  (userOptions = {}) => {
    const options = normalizeOptions(userOptions)
    const finalMap = buildColorMap(options)

    const extendedColors = {}
    const useFunctionColors = Number(options.tailwindVersion) < 4
    const toAlphaPercent = (opacityValue) => {
      if (opacityValue === undefined || opacityValue === null) return null
      if (typeof opacityValue === 'string' && opacityValue.trim().endsWith('%')) return opacityValue.trim()
      const numeric = Number(opacityValue)
      if (Number.isFinite(numeric)) return `${numeric * 100}%`
      return `calc(${opacityValue} * 100%)`
    }

    Object.entries(finalMap).forEach(([alias, v]) => {
      const fallback = options.previewFallback ? resolvePreviewFallback(v && v.light, null) : null
      const baseValue = fallback ? `var(--${alias}, ${fallback})` : `var(--${alias})`

      if (useFunctionColors) {
        extendedColors[alias] = ({ opacityValue } = {}) => {
          const alpha = toAlphaPercent(opacityValue)
          if (!alpha) return baseValue
          return `color-mix(in srgb, ${baseValue} ${alpha}, transparent)`
        }
      } else {
        extendedColors[alias] = baseValue
      }
    })

    return {
      theme: {
        extend: {
          colors: extendedColors,
        },
      },
    }
  }
)
