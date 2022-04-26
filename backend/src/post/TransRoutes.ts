import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Trans, { TFilter } from "./TransService";
import Program from "./service/ProgramService";
import axios from 'axios';
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
import Post from "./service";
const app = express.Router()

const getBreeds = async (count: any, blockId: any) => {
  try {
    return await axios.get(`https://public-api.solscan.io/block/transactions?block=${blockId}&offset=0&limit=${count}`)
  } catch (error) {
    console.error(error)
  }
}

const getSingleBlock = async (blockId: any) => {
  try {
    return await axios.get(`https://public-api.solscan.io/block/${blockId}`)
  } catch (error) {
    console.error(error)
  }
}
app.get('/',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await Trans.findAll()
    const response = createResponse("OK", users, undefined)
    res.json(response)
  })
)

app.get('/:id',
  [param('id'), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deleted = await Trans.findByUid(Number(id));
    const response = createResponse("OK", deleted, undefined)
    res.json(response)
  })
)

app.post('/',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    var { count, blockId }: any = req.body;
    var blockData: any = [];
    var dataArray: any = [];
    var newUser: any = [];
    var transId:any = 0
    // console.log(allSlotId);
    let programArray: any = [];
    // if (allSlotId === null) {
      for (let i = 0; i < count; i++) {
        const allSlotId = await Post.findByCurrentSlot(blockId);
        if (allSlotId === null) {
        blockData = await getSingleBlock(blockId);
        Post.createNew(blockData.data.currentSlot, blockData.data.result)
        dataArray = await getBreeds(blockData.result?.transactionCount, blockId);

        console.log("=======", dataArray);
        newUser = dataArray && await Promise.all(dataArray.data.map((data: any,index:number) => {
          transId=index
          Trans.createNew(blockId, data.meta, data.transaction)
        }))
        dataArray.data.map((data: any) => {
          data.transaction.message.instructions.map((item: any) => {
            programArray.push(Program.createNew(blockId, transId,item.accounts, item.data, item.programId))
          })
        }
        )
        if(newUser){var newProgram = await Promise.all(programArray)}
      }
        blockId = blockId - 1;
      }
    // }
    res.send(newUser)

  })
)
// app.post('/b',
//   expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { blockId }: any = req.body;
//     const dataArray: any = await getSingleBlock(blockId);
//     const newUser: any = await Promise.all(dataArray.data.map((data: any) => Trans.createNew(blockId, data.meta, data.transaction)))
//     var newProgram = await Promise.all(dataArray.data.map((data: any) => {
//       data.transaction.message.instructions.map((item: any) => {
//         Program.createNew(blockId, item.accounts, item.data, item.programId)
//       })
//     }
//     ))

//     res.send(newUser)

//   })
// )
app.delete('/:id',
  [param('id'), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deleted = await Trans.deleteById(Number(id));
    const response = createResponse("OK", "Success", undefined)
    res.json(response)
  })
)

app.use(expressErrorHandler);

export default app

