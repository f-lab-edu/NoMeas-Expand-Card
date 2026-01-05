import { describe, expect, test } from 'vitest'
import { deepClone } from '~/deep'

describe('deepClone', () => {
  test('clones nested objects and arrays', () => {
    const original = { a: { b: [1, 2, { c: 3 }] } }
    const cloned = deepClone(original)

    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned.a).not.toBe(original.a)
    expect(cloned.a.b).not.toBe(original.a.b)
    expect(cloned.a.b[2]).not.toBe(original.a.b[2])
  })

  test('clones Map and Set deeply', () => {
    const key = { k: 1 }
    const value = { v: 2 }
    const original = {
      map: new Map([[key, value]]),
      set: new Set([value])
    }
    const cloned = deepClone(original)

    expect(cloned).toEqual(original)
    expect(cloned.map).not.toBe(original.map)
    expect(cloned.set).not.toBe(original.set)

    const [clonedKey] = [...cloned.map.keys()]
    const [clonedSetItem] = [...cloned.set.values()]
    expect(clonedKey).not.toBe(key)
    expect(cloned.map.get(clonedKey)).not.toBe(value)
    expect(clonedSetItem).not.toBe(value)
  })

  test('clones Date', () => {
    const original = {
      d: new Date('2020-01-01T00:00:00.000Z')
    }
    original.r.lastIndex = 2

    const cloned = deepClone(original)
    expect(cloned.d).toEqual(original.d)
    expect(cloned.d).not.toBe(original.d)
  })
})
