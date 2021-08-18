import AuthorType from "src/types/AuthorType";
import FeedType from "src/types/FeedType";
import CollectionType from "src/types/CollectionType";

interface EntryType {
  id: number,
  name: string,
  summary: string,
  content: string,
  url: string,
  image: string,
  is_read: boolean,
  is_saved: boolean,
  created_at: string,
  updated_at: string,
  author: AuthorType,
  feed: FeedType,
  collections: CollectionType[]
}

export default EntryType
