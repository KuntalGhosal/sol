import Posts, { TFilter } from "./service";
import { pagination, filters } from "../helper";

export async function paginatePosts(filter: TFilter) {
  const { pageNumber, pageSize } = filter
  delete filter.pageNumber; delete filter.pageSize
  let paginate = {}
  if (pageNumber || pageSize) {
    paginate = pagination(pageNumber!, pageSize!);
  }
  const where = filters(filter)
  const users = await Posts.findAndCountAll(paginate, where)
  if (!users) return 0
  return users
}
