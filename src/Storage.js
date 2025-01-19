import BrowserStorage from './BrowserStorage'
import MemoryStorage from './MemoryStorage'
import UserscriptStorage from './UserscriptStorage'

export default class Storage {
  static Types = {
    local: BrowserStorage,
    memory: MemoryStorage,
    session: BrowserStorage,
    userscript: UserscriptStorage,
  }

  constructor(options = {}) {
    const { type } = options

    if (!Storage.Types[type]) {
      throw new Error(`Unknown storage: ${type}. Use one of: ${Object.keys(Storage.Types).join(', ')}.`)
    }

    return new Storage.Types[type](options)
  }
}
