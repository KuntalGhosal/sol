// import program, { TProgramPost } from "./program"
// import { PostsError } from "../error"

import { PostsError } from "../../error";
import EtherTransactions, { TEtherTransactionsModelPost } from "../model/EtherTransactionsModel";

export type TFilter = {
  name?: string;
  id?: number;
  uid?: string;
  phone?: string;
  email?: string;
  pageSize?: number;
  pageNumber?: number;
}

export default class EtherTransactionsService {

  static async findByUid(id: number) {
    const user = await EtherTransactions.findByPk(id)
    if (!user) throw new PostsError(`${id} not found `)
    return user
  }

  static async findAll() {
    const users = await EtherTransactions.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    })
    return users
  }

  static async createNew(accessList:any,blockHash:any, blockNumber:any,chainId:any,from:any,gas:any,gasPrice:any,hash:any,input:any,maxFeePerGas:any,
    maxPriorityFeePerGas:any,nonce:any,r:any,s:any,to:any,transactionIndex:any,type:any,v:any,value:any ) {
    try {      
      const newuser = await EtherTransactions.create({accessList:accessList,blockHash:blockHash,blockNumber:blockNumber,chainId:chainId,from:from,gas:gas,gasPrice:gasPrice,hash:hash,input:input,maxFeePerGas:maxFeePerGas,
    maxPriorityFeePerGas:maxPriorityFeePerGas,nonce:nonce,r:r,s:s,to:to,transactionIndex:transactionIndex,type:type,v:v,value:value})
      return newuser;
    } catch (error) {
      throw new PostsError("Unable to create new ")
    }
  }

  static async updateById(id: number, post: TEtherTransactionsModelPost) {
    try {
      await EtherTransactionsService.findByUid(id)
      const [isUpdated] = await EtherTransactions.update(post, {
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
      const deleted = await EtherTransactions.destroy({
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
    const users = await EtherTransactions.findAndCountAll({ ...paginate, where })
    if (!users) throw new PostsError("Unable to find and count");
    return users
  }

}
