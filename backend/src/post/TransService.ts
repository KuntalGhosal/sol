import TransModel, { TTransPost } from "./TransModel"
import { PostsError } from "../error"

export type TFilter = {
  name?: string;
  id?: number;
  uid?: string;
  phone?: string;
  email?: string;
  pageSize?: number;
  pageNumber?: number;
}

export default class TransService {

  static async findByUid(id: number) {
    const user = await TransModel.findByPk(id)
    if (!user) throw new PostsError(`${id} not found `)
    return user
  }

  static async findAll() {
    const users = await TransModel.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    })
    return users
  }

  static async createNew(blockId:number,meta:object, transaction:object) {
    // const title = post.currentSlot;
    try {
      const newuser = await TransModel.create({blockId:blockId,meta:meta,transaction:transaction})
      return newuser;
    } catch (error) {
      throw new PostsError("Unable to create new ")
    }
  }

  static async updateById(id: number, post: TTransPost) {
    try {
      await TransService.findByUid(id)
      const [isUpdated] = await TransModel.update(post, {
        where: { id },
        returning: true
      })
      return isUpdated;
    } catch (error) {
      throw new PostsError("No data to update")
    }
  }

  static async deleteById(id: number) {
    try {
      const deleted = await TransModel.destroy({
        where: { id }
      });
      console.log(deleted);
      if (!deleted) throw new PostsError("No data to delete");
      return deleted
    } catch (error) {
      throw new PostsError("No data to delete");
    }
  }

  static async findAndCountAll(paginate: any, where: any) {
    const users = await TransModel.findAndCountAll({ ...paginate, where })
    if (!users) throw new PostsError("Unable to find and count");
    return users
  }

}
