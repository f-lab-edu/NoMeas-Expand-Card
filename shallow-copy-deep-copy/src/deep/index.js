export const deepClone = (value, customizer, seen = new WeakMap()) => {
  if (typeof value !== 'object' || value === null) return value
  // 순환참조 시 저장된 값 리턴
  if (seen.has(value)) return seen.get(value)

  if (value instanceof Date) return cloneDate(value, seen)
  if (value instanceof Map) return cloneMap(value, seen)
  if (value instanceof Set) return cloneSet(value, seen)
  if (Array.isArray(value)) return cloneArray(value, seen)

  return cloneObject(value, customizer, seen)
}

const cloneDate = (date, seen) => {
  const cloned = new Date(date.getTime())
  seen.set(date, cloned)
  copyOwnProperties(date, cloned, seen)
  return cloned
}

const cloneMap = (map, seen) => {
  const cloned = new Map()
  seen.set(map, cloned)
  for (const [key, value] of map.entries())
    cloned.set(deepClone(key, seen), deepClone(value, seen))
  return cloned
}

const cloneSet = (set, seen) => {
  const cloned = new Set()
  seen.set(set, cloned)
  for (const item of set.values()) cloned.add(deepClone(item, seen))
  return cloned
}

const cloneArray = (array, seen) => {
  const cloned = new Array(array.length)
  seen.set(array, cloned)
  for (let i = 0; i < array.length; i++) cloned[i] = deepClone(array[i], seen)
  copyOwnProperties(array, cloned, seen)
  return cloned
}

const cloneObject = (obj, customizer, seen) => {
  if (customizer != null) {
    return customizer(obj)
  }

  const cloned = Object.create(Object.getPrototypeOf(obj))
  seen.set(obj, cloned)
  copyOwnProperties(obj, cloned, seen)
  return cloned
}

const copyOwnProperties = (source, target, seen) => {
  // 프로퍼티 플래그와 설명자
  const descriptors = Object.getOwnPropertyDescriptors(source)
  // Object.keys와 Reflect.ownKeys
  for (const key of Reflect.ownKeys(descriptors)) {
    const desc = descriptors[key]
    if ('value' in desc) desc.value = deepClone(desc.value, seen)
    Object.defineProperty(target, key, desc)
  }
}
