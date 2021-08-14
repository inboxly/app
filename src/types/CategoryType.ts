import FeedType from "src/types/FeedType";

interface CategoryType {
  id: number,
  title: string,
  is_default: boolean,
  feeds: FeedType[],
}

export default CategoryType
