# Browser Storage

## Overview

Browser Storage is a simple wrapper for `localStorage`, `sessionStorage`, and userscript storage (e.g., `GM.getValue`, `GM.setValue`).

---

## Installation

### Node

```bash
npm i @nicebuzzy/browser-storage
```

For development and testing in a Node environment, a `localStorage` mock is required.

### Browser

```html
<script type="module">
  import Storage from 'https://esm.run/@nicebuzzy/browser-storage'
</script>
```

### Userscripts

```js
const Storage = await import('https://esm.run/@nicebuzzy/browser-storage')
```

---

## Usage

### Local and Session Storage

```js
const store = new Storage({ type: 'local' })

store.set('foo', 'bar')
store.set('baz', 'qux')

store.get('foo') // 'bar'
store.get('baz') // 'qux'
store.list() // { foo: 'bar', baz: 'qux' }

store.remove('baz')
store.get('baz') // undefined
store.list() // { foo: 'bar' }

store.clear()
store.list() // {}
```

#### Using scopes

The `scope` option allows customization of key storage:

```js
const settings = new Storage({ type: 'local', scope: 'settings:', trim: false })
```

Scoped instances only work with keys that match their scope:

```js
store.set('foo', 'bar')
settings.set('foo', 'bar')

store.list() // { foo: 'bar', 'settings:foo': 'bar' }
settings.list() // { 'settings:foo': 'bar' }

settings.clear()
settings.list() // {}
store.list() // { foo: 'bar' }

store.clear() // clears all keys, including scoped ones
```

Set the `trim` option to `true` to hide scope in outputs:

```js
settings.set('foo', 'bar')
settings.list() // { foo: 'bar' }
```

### Userscripts

Methods for userscripts return a promise. The scope is used as a nested object:

```js
const store = new Storage({ type: 'userscript' })
const settings = new Storage({ type: 'userscript', scope: 'settings' })

await store.set('foo', 'bar')
await settings.set('foo', 'bar')

await store.list() // { foo: 'bar', settings: { foo: 'bar' } }
await settings.list() // { foo: 'bar' }
```

---

## API Reference

### Constructor

```js
const store = new Storage({ type: 'local' })
```

| Option   | Type    | Default | Description                                                                 |
| -------- | ------- | ------- | --------------------------------------------------------------------------- |
| `type`   | string  | `local` | Storage type: `local`, `session`, `userscript`, or `memory`. |
| `scope` | string  | `null`  | Optional scope for keys (applies to `local`, `session`, and `userscript`). |
| `trim`   | boolean | `false` | If `true`, removes the scope in outputs (applies to `local` and `session`). |

### Methods

#### `store.clear()`

Clears all entries in the storage.

#### `store.get(key, defaultValue = undefined)`

Retrieves the value for the given key. Returns `defaultValue` if the key is not found.

#### `store.keys()`

Returns all keys in the storage.

#### `store.list()`

Lists all key-value pairs in the storage.

#### `store.remove(key)`

Removes the specified key and its value from the storage.

#### `store.set(key, value)`

Adds or updates a key-value pair in the storage.

### Properties

#### `store.size`

Returns the number of keys stored.

---