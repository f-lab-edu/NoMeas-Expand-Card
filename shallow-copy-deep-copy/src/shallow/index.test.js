import { describe, expect, test } from 'vitest'
import { shallowCopyApi } from '~/shallow'

describe('shallowCopyApi', () => {
  test('spreadSyntax: array (shallow)', () => {
    const nested = { a: 1 }
    const original = [nested, 2]
    const copied = shallowCopyApi.spreadSyntax(original)

    expect(copied).toEqual(original)
    expect(copied).not.toBe(original)
    expect(copied[0]).toBe(original[0])
  })

  test('spreadSyntax: object (shallow)', () => {
    const nested = { a: 1 }
    const original = { nested, b: 2 }
    const copied = shallowCopyApi.spreadSyntax(original)

    expect(copied).toEqual(original)
    expect(copied).not.toBe(original)
    expect(copied.nested).toBe(original.nested)
  })

  test('copyArray returns a new array', () => {
    const original = [1, 2, 3]
    const copied = shallowCopyApi.copyArray(original)

    expect(copied).toEqual(original)
    expect(copied).not.toBe(original)
  })

  test('slice returns a new array', () => {
    const original = [1, 2, 3]
    const copied = shallowCopyApi.slice(original)

    expect(copied).toEqual(original)
    expect(copied).not.toBe(original)
  })

  test('copyObject / assign return a new object', () => {
    const original = { a: 1, b: 2 }
    const reduced = shallowCopyApi.copyObject(original)
    const assigned = shallowCopyApi.assign(original)

    expect(reduced).toEqual(original)
    expect(reduced).not.toBe(original)
    expect(assigned).toEqual(original)
    expect(assigned).not.toBe(original)
  })

  test('arrayFrom clones array-like into a new array', () => {
    const arrayLike = { 0: 'x', 1: 'y', length: 2 }
    expect(shallowCopyApi.arrayFrom(arrayLike)).toEqual(['x', 'y'])
  })
})
