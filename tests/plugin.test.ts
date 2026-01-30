// tests/plugin.test.js
import { describe, it, expect } from 'vitest'
import darkwind from '../src/index.js'

function getExtendedColors(options = {}) {
  const pluginInstance = darkwind(options) as any
  const config = pluginInstance.config

  const mockTheme = (path: string) => {
    const mockColors: Record<string, any> = {
      white: '#ffffff',
      black: '#000000',
      blue: { '100': '#dbeafe', '800': '#1e40af' },
      slate: { '50': '#f8fafc', '950': '#020617' },
      gray: { '950': '#030712' },
    }
    if (path === 'colors') return mockColors
    return null
  }

  const extendedColorsFn = config.theme.extend.colors

  return typeof extendedColorsFn === 'function' ? extendedColorsFn(mockTheme) : extendedColorsFn
}

describe('Darkwind Plugin Logic Tests', () => {
  it('should map theme colors to CSS variables with alpha support', () => {
    const colors = getExtendedColors({ tailwindVersion: 3 })

    const blue = colors['x-blue-100']
    const baseValue = typeof blue === 'function' ? blue({}) : blue
    const alphaValue = typeof blue === 'function' ? blue({ opacityValue: '0.5' }) : blue

    expect(typeof baseValue).toBe('string')
    expect(baseValue).toMatch(/var\(--x-blue-100/)
    if (typeof blue === 'function') {
      expect(alphaValue).toMatch(/color-mix\(/)
    }
    expect(colors['x-blue-800']).toBeDefined()
  })

  it('should always include base white and black aliases', () => {
    const colors = getExtendedColors({})

    expect(colors['x-white']).toBeDefined()
    expect(colors['x-black']).toBeDefined()
  })

  it('should not generate unshaded or passthrough aliases', () => {
    const colors = getExtendedColors({})

    expect(colors['x-blue']).toBeUndefined()
    expect(colors['x-transparent']).toBeUndefined()
    expect(colors['x-current']).toBeUndefined()
    expect(colors['x-inherit']).toBeUndefined()
  })
})
