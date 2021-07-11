export function getFeedEntriesCount (state) {
  return feedId => {
    const feed = state.feedsCounts.find(feed => feed.id === feedId)
    return feed ? feed.entries_count : 0
  }
}

export function getCategoryEntriesCount (state) {
  return categoryId => {
    const category = state.categories.find(category => category.id === categoryId)
    const feedIds = category.feeds.map(feed => feed.id)
    return  state.feedsCounts.reduce(function (total, feed) {
      return feedIds.includes(feed.id) ? total + feed.entries_count : total
    }, 0)
  }
}

export function getAllEntriesCount (state) {
  return state.feedsCounts.reduce((total, feed) => total + feed.entries_count, 0)
}
