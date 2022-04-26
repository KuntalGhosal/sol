// import program, { TProgramPost } from "./program"
// import { PostsError } from "../error"

import { PostsError } from "../../error";
import program, { TProgramPost } from "../model/ProgramIdModel";

export type TFilter = {
  name?: string;
  id?: number;
  uid?: string;
  phone?: string;
  email?: string;
  pageSize?: number;
  pageNumber?: number;
}

export default class ProgramService {

  static async findByUid(id: number) {
    const user = await program.findByPk(id)
    if (!user) throw new PostsError(`${id} not found `)
    return user
  }

  static async findAll() {
    const users = await program.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    })
    return users
  }

  static async createNew(blockId:number,transId:any,accounts:any, data:any,programId:any) {
    try {      
      const newuser = await program.create({blockId:blockId,transId:transId,accounts:accounts,data:data,programId:programId})
      return newuser;
    } catch (error) {
      throw new PostsError("Unable to create new ")
    }
  }

  static async updateById(id: number, post: TProgramPost) {
    try {
      await ProgramService.findByUid(id)
      const [isUpdated] = await program.update(post, {
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
      const deleted = await program.destroy({
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
    const users = await program.findAndCountAll({ ...paginate, where })
    if (!users) throw new PostsError("Unable to find and count");
    return users
  }

}
