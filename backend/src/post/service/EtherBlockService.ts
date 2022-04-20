// import program, { TProgramPost } from "./program"
// import { PostsError } from "../error"

import { PostsError } from "../../error";
import EtherBlock, { TEtherModelPost } from "../model/EtherBlockModel";

export type TFilter = {
  name?: string;
  id?: number;
  uid?: string;
  phone?: string;
  email?: string;
  pageSize?: number;
  pageNumber?: number;
}

export default class EtherBlockService {

  static async findByUid(id: number) {
    const user = await EtherBlock.findByPk(id)
    if (!user) throw new PostsError(`${id} not found `)
    return user
  }

  static async findAll() {
    const users = await EtherBlock.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    })
    return users
  }

  static async createNew(jsonrpc:String,id:any, result:any) {
    try {      
      const newuser = await EtherBlock.create({jsonrpc:jsonrpc,id:id,result:result})
      return newuser;
    } catch (error) {
      throw new PostsError("Unable to create new ")
    }
  }

  static async updateById(id: number, post: TEtherModelPost) {
    try {
      await EtherBlockService.findByUid(id)
      const [isUpdated] = await EtherBlock.update(post, {
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
      const deleted = await EtherBlock.destroy({
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
    const users = await EtherBlock.findAndCountAll({ ...paginate, where })
    if (!users) throw new PostsError("Unable to find and count");
    return users
  }

}
