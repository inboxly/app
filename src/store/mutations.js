export function setFeedsCounts (state, feedsCounts) {
  state.feedsCounts = feedsCounts
}

export function setCategories (state, categories) {
  state.categories = categories
}

export function setCollections (state, collections) {
  state.collections = collections
}

export function setEntries (state, entries) {
  state.entries = entries
}

export function removeEntries (state, entries) {
  state.entries = state.entries.filter(
    entry => entries.some(entryToRemove => entryToRemove.id !== entry.id)
  )
}

export function unshiftEntries (state, entries) {
  state.entries.unshift(...entries)
}

export function addEntries (state, entries) {
  state.entries.push(...entries)
}

export function markEntryAsRead (state, entryId) {
  const entry = state.entries.find(entry => entry.id === entryId)

  if (!entry) {
    return
  }

  entry.is_read = true
  const feed = state.feedsCounts.find(feed => feed.id === entry.feed.id)

  if (feed) {
    feed.entries_count -= 1
  }
  state.entriesToMarkRead.push(entryId)
}
export function markEntryAsUnread (state, entryId) {
  const entry = state.entries.find(entry => entry.id === entryId)

  if (!entry) {
    return
  }

  entry.is_read = false

  const feed = state.feedsCounts.find(feed => feed.id === entry.feed.id)

  if (feed) {
    feed.entries_count -= 1
  }
  state.entriesToMarkRead.push(entryId)
}

export function removeFromEntriesToMarkRead(state, ids) {
  state.entriesToMarkRead = state.entriesToMarkRead.filter(
    id => !ids.includes(id)
  )
}

export function saveEntryToCollection (state, { collectionId, entryId }) {
  const collection = state.collections.find(
    collection => collection.id === collectionId,
  )

  const entry = state.entries.find(entry => entry.id === entryId)

  if (!collection || !entry) {
    return
  }

  entry.collections.push(collection)
}

export function removeEntryFromCollection (state, { collectionId, entryId }) {
  const entry = state.entries.find(entry => entry.id === entryId)

  if (!entry) {
    return
  }

  entry.collections = entry.collections.filter(
    entryCollection => entryCollection.id !== collectionId
  )
}
