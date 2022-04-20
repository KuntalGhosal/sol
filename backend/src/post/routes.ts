import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Post, { TFilter } from "./service";
import axios from 'axios';
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

const getBreeds = async (req: any) => {
  try {
    return await axios.get(`https://public-api.solscan.io/block/last?limit=${req}`)
  } catch (error) {
    console.error(error)
  }
}
app.get('/',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const dataArray :any =await getBreeds();
    // if(dataArray.data){
    //   console.log(dataArray);

    // }    
    // console.log("Start Time:", new Date())
    const users = await Post.findAll()
    const response = createResponse("OK", users, undefined)
    // console.log("End Time:", new Date())
    res.json(response)
  })
)

app.get('/:id',
  [param('id'), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deleted = await Post.findByUid(Number(id));
    const response = createResponse("OK", deleted, undefined)
    res.json(response)
  })
)

app.post('/',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { count }: any = req.body;
    const dataArray: any = await getBreeds(count);
    const newUser: any = await Promise.all(dataArray.data.map((data: any) => Post.createNew(data.currentSlot, data.result)))
    res.json(newUser)

  })
)

// app.put('/:id',
//   [param('id'),
//   body('status').isBoolean(),
//   body('description').isString(),
//   body("title").isString(), validate],
//   // expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
//   //   const { status, description, title } = req.body
//   //   const newUser = await Post.updateById(Number(req.params.id), { status, description, title })
//   //   const response = createResponse("OK", newUser, undefined)
//   //   res.json(response)
//   // })
// )

app.delete('/:id',
  [param('id'), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deleted = await Post.deleteById(Number(id));
    const response = createResponse("OK", "Success", undefined)
    res.json(response)
  })
)

app.use(expressErrorHandler);

export default app

