import CategoryType from "src/types/CategoryType";

interface FeedType {
  id: string,
  name: string,
  summary: string,
  url: string,
  image: string,
  created_at: string,
  updated_at: string,
  categories: CategoryType[]
}

export default FeedType
