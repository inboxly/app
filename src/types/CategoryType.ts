import FeedType from "src/types/FeedType";

interface CategoryType {
  id: number,
  name: string,
  is_customizable: boolean,
  feeds: FeedType[],
}

export default CategoryType
