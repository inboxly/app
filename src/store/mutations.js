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

export function removeFromEntriesToMarkRead(state, ids) {
  state.entriesToMarkRead = state.entriesToMarkRead.filter(
    id => !ids.includes(id)
  )
}
