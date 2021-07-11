import { api } from 'boot/axios'

let markAsReadTimeout = null

// todo: The server must return a relative url (without protocol, host, port)
function hotfixNextUrl(nextUrl) {
  return (nextUrl && nextUrl.startsWith('http'))
    ? nextUrl.slice(nextUrl.indexOf('/api'))
    : nextUrl
}

export function fetchFeedsCounts (context) {
  return api.get('api/feeds/counts').then(response => {
    context.commit('setFeedsCounts', response.data.data)
  })
}

export function fetchCategories (context) {
  api.get('api/categories').then(response => {
    context.commit('setCategories', response.data.data)
  })
}

export function fetchCollections (context) {
  api.get('api/collections').then(response => {
    context.commit('setCollections', response.data.data)
  })
}

export function fetchEntries (context, url) {
  return api.get(url).then(response => {
    const { data, links } = response.data
    context.commit('setEntries', data)
    return hotfixNextUrl(links.next)
  })
}

export function fetchMoreEntries (context, url) {
  return api.get(url).then(response => {
    const { data, links } = response.data
    context.commit('addEntries', data)
    return hotfixNextUrl(links.next)
  })
}

export function sendMarkEntriesAsRead (context) {
  const ids = context.state.entriesToMarkRead
  return api.post('/api/read/entries', { ids }).then(() => {
    context.commit('removeFromEntriesToMarkRead', ids)
  }).catch(() => {
    console.log('Fail on send mark entries as read.', ids)
  })
}

export function markEntryAsRead (context, entryId) {
  context.commit('markEntryAsRead', entryId)

  const entry = context.state.entries.find(entry => entry.id === entryId)

  if (entry) {
    entry.is_read = true

    if (markAsReadTimeout) {
      clearTimeout(markAsReadTimeout)
    }

    markAsReadTimeout = setTimeout(
      () => context.dispatch('sendMarkEntriesAsRead'),
      1000,
    )
  }
}
