export function setCategories (state, categories) {
  state.categories = categories
}

export function setCollections (state, collections) {
  state.collections = collections
}

export function setEntries (state, entries) {
  state.entries = entries
}

export function addEntries (state, entries) {
  state.entries.push(...entries)
}

export function markEntryAsRead (state, entryId) {
  const entry = state.entries.find(entry => entry.id === entryId)

  if (entry) {
    entry.is_read = true
    state.entriesToMarkRead.push(entryId)
  }
}

export function removeFromEntriesToMarkRead(state, ids) {
  state.entriesToMarkRead = state.entriesToMarkRead.filter(
    id => !ids.includes(id)
  )
}
