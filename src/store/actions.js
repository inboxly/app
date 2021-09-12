import { api } from 'boot/axios'

let markAsReadTimeout = null

function relativeUrl (nextUrl) {
  return (nextUrl && nextUrl.startsWith('http'))
    ? nextUrl.slice(nextUrl.indexOf('/api'))
    : nextUrl
}

export function fetchProfile (context) {
  return api.get('api/profile').then(response => {
    context.commit('setProfile', response.data.data)
  })
}

export function fetchFeedsCounts (context) {
  return api.get('api/feeds/counts').then(response => {
    context.commit('setFeedsCounts', response.data.data)
  })
}

export function fetchCategories (context) {
  return api.get('api/categories').then(response => {
    context.commit('setCategories', response.data.data)
  })
}

export function fetchCollections (context) {
  return api.get('api/collections').then(response => {
    context.commit('setCollections', response.data.data)
  })
}

export function fetchEntries (context, url) {
  return api.get(url).then(response => {
    const { data, links } = response.data
    context.commit('setEntries', data)
    return relativeUrl(links.next)
  })
}

export function fetchMoreEntries (context, url) {
  return api.get(url).then(response => {
    const { data, links } = response.data
    context.commit('addEntries', data)
    return relativeUrl(links.next)
  })
}

export function sendMarkEntriesAsRead (context) {
  const ids = context.state.entriesToMarkRead
  return api.post('/api/read/entries', { ids }).then(() => {
    context.commit('removeFromEntriesToMarkRead', ids)
  }).catch(() => {
    console.log('Fail on send mark entries as read.', ids)
    // todo: revert entries marks end feeds counts
  })
}

export function markEntryAsRead (context, entryId) {
  context.commit('markEntryAsRead', entryId)

  if (markAsReadTimeout) {
    clearTimeout(markAsReadTimeout)
  }

  markAsReadTimeout = setTimeout(() => {
    if (context.state.entriesToMarkRead.length) {
      return context.dispatch('sendMarkEntriesAsRead')
    }
  }, 1000)
}

export function markEntryAsUnread (context, entryId) {
  context.commit('markEntryAsUnread', entryId)

  return api.delete('/api/read/entries', { data: { ids: [entryId] } }).
    catch(() => {
      console.log('Fail on send mark entry as unread.', entryId)
      // todo revert entry mark and feeds counts
    })
}

export function saveEntryToCollection (context, { collectionId, entryId }) {
  return api.post(`/api/collections/${collectionId}/entries`, { ids: [entryId] }).then(() => {
    context.commit('saveEntryToCollection', { collectionId, entryId })
  }).catch(() => {
    console.log('Fail on save entries to collection.', collectionId, entryId)
  })
}

export function saveEntryToReadLater (context, { entryId }) {
  const readLaterCollectionId = context.state.profile.read_later_collection_id
  return api.post(`/api/collections/${readLaterCollectionId}/entries`, { ids: [entryId] }).then(() => {
    context.commit('saveEntryToReadLater', { entryId })
  }).catch(() => {
    console.log('Fail on save entries to read later.', readLaterCollectionId, entryId)
  })
}

export function removeEntryFromCollection (context, { collectionId, entryId }) {
  return api.delete(`/api/collections/${collectionId}/entries`, {data: { ids: [entryId] }}).then(() => {
    context.commit('removeEntryFromCollection', { collectionId, entryId })
  }).catch(() => {
    console.log('Fail on remove entries from collection.', collectionId, entryId)
  })
}

export function removeEntryFromReadLater (context, { entryId }) {
  const readLaterCollectionId = context.state.profile.read_later_collection_id
  return api.delete(`/api/collections/${readLaterCollectionId}/entries`, {data: { ids: [entryId] }}).then(() => {
    context.commit('removeEntryFromReadLater', { entryId })
  }).catch(() => {
    console.log('Fail on remove entries from read later.', entryId)
  })
}
