import AuthorType from "src/types/AuthorType";
import FeedType from "src/types/FeedType";
import CollectionType from "src/types/CollectionType";

interface EntryType {
  id: string,
  name: string,
  summary: string,
  content: string,
  url: string,
  image: string,
  author: AuthorType,
  is_read: boolean,
  is_read_later: boolean,
  created_at: string,
  updated_at: string,
  feed: FeedType,
  collections: CollectionType[]
}

export default EntryType
