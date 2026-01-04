export const shallowCopyApi = {
  spreadSyntax: (value) => {
    if (Array.isArray(value)) return [...value]
    if (isPlainObject(value)) return { ...value }
    return value
  },
  copyArray: (array) => {
    if (Array.isArray(array) === false) return array

    return array.reduce((copied, item) => {
      copied.push(item)
      return copied
    }, [])
  },
  slice: (array) => {
    if (Array.isArray(array) === false) return array
    return array.slice()
  },
  copyObject: (obj) => {
    if (isPlainObject(obj) === false) return obj

    return Object.entries(obj).reduce((copied, [key, value]) => {
      copied[key] = value
      return copied
    }, {})
  },
  assign: (obj) => {
    if (isPlainObject(obj) === false) return obj
    return Object.assign({}, obj)
  },
  arrayFrom: (arrayLike) => {
    if (arrayLike == null) return arrayLike
    if (typeof arrayLike !== 'object' && typeof arrayLike !== 'function')
      return arrayLike
    return Array.from(arrayLike)
  }
}

const isPlainObject = (value) => {
  if (typeof value !== 'object' || value === null) return false
  if (Array.isArray(value)) return false
  return Object.getPrototypeOf(value) === Object.prototype
}
