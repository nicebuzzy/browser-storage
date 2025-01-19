export default class UserscriptStorage {
  required = [
    'GM.getValue',
    'GM.getValues',
    'GM.setValue',
    'GM.setValues',
    'GM.deleteValue',
    'GM.deleteValues',
    'GM.listValues'
  ]

  constructor({ scope = null } = {}) {
    const { script: { grant = [] } } = globalThis.GM.info

    if (!this.required.every(key => grant.includes(key))) {
      throw new Error(`@grant required: ${this.required.join(', ')}.`)
    }

    this.scope = scope
    this.storage = globalThis.GM
  }

  get size() {
    return (async () => (await this.keys()).length)()
  }

  async get(key, defaultValue = undefined) {
    return this.scope
      ? await this.getWithScope(key, defaultValue)
      : await this.storage.getValue(key, defaultValue)
  }

  async getWithScope(key, defaultValue = undefined) {
    const object = await this.getScopeValue()
    return object?.[key] ?? defaultValue
  }

  async getScopeValue() {
    return await this.storage.getValue(this.scope, {})
  }

  async set(key, value) {
    this.scope
      ? await this.setWithScope(key, value)
      : await this.storage.setValue(key, value)
  }

  async setWithScope(key, value) {
    const object = await this.getScopeValue()
    object[key] = value
    await this.setScopeValue(object)
  }

  async setScopeValue(object = {}) {
    this.scope && await this.storage.setValue(this.scope, { ...object })
  }

  async remove(key) {
    this.scope
      ? await this.removeWithScope(key)
      : await this.storage.deleteValue(key)
  }

  async removeWithScope(key) {
    const object = await this.getScopeValue()
    delete object[key]
    await this.setScopeValue(object)
  }

  async list(scope = true) {
    return this.scope && scope
      ? await this.getScopeValue()
      : await this.storage.getValues(await this.keys())
  }

  async clear() {
    this.scope
      ? await this.storage.deleteValue(this.scope)
      : await this.storage.deleteValues(await this.keys())
  }

  async keys() {
    return this.scope
      ? Object.keys(await this.getScopeValue())
      : await this.storage.listValues()
  }
}
