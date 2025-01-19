export default class MemoryStorage {
  constructor() {
    this.storage = new Map()
  }

  get size() {
    return this.storage.size
  }

  get(key, defaultValue = undefined) {
    return this.storage.get(key) ?? defaultValue
  }

  set(key, value) {
    this.storage.set(key, value)
  }

  remove(key) {
    this.storage.delete(key)
  }

  list() {
    return Object.fromEntries(this.storage.entries())
  }

  clear() {
    this.storage.clear()
  }

  keys() {
    return [...this.storage.keys()]
  }
}
