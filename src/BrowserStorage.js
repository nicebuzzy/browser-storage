export default class BrowserStorage {
  types = {
    local: globalThis?.localStorage,
    session: globalThis?.sessionStorage
  }

  constructor({ type = 'local', scope = null, trim = false } = {}) {
    if (!this.types[type]) {
      throw new Error(`Unknown storage: ${type}. Use one of: ${Object.keys(this.types).join(', ')}.`)
    }

    this.scope = scope
    this.trim = trim
    this.storage = this.types[type]
  }

  get size() {
    return this.keys().length
  }

  get(key, defaultValue = undefined) {
    const value = this.storage.getItem(this.addScope(key))
    return value ? this.deserialize(value) : defaultValue
  }

  set(key, value) {
    this.storage.setItem(this.addScope(key), this.serialize(value))
  }

  remove(key) {
    this.storage.removeItem(this.addScope(key))
  }

  list() {
    return Object.fromEntries(
      this.keys().map(key => [this.trim ? this.removeScope(key) : key, this.get(key)])
    )
  }

  clear() {
    this.keys().forEach(key => this.remove(key))
  }

  keys() {
    return Object.keys(this.storage)
      .filter(key => this.scope ? this.hasScope(key) : true)
      .map(key => this.trim ? this.removeScope(key) : key)
  }

  addScope(key) {
    return this.scope && !this.hasScope(key)
      ? `${this.scope}${key}`
      : key
  }

  removeScope(key) {
    return this.scope && this.hasScope(key)
      ? key.slice(this.scope.length)
      : key
  }

  hasScope(key) {
    return key.startsWith(this.scope)
  }

  serialize(value) {
    try {
      return JSON.stringify(value)
    } catch (error) {
      console.error(error)
    }
  }

  deserialize(value) {
    try {
      return JSON.parse(value)
    } catch (error) {
      console.error(error)
    }
  }
}
