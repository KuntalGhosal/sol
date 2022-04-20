import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import EtherBlockService, { TFilter } from "../service/EtherBlockService";
import axios from 'axios';
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../../helper'
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
    const users = await EtherBlockService.findAll()
    const response = createResponse("OK", users, undefined)
    // console.log("End Time:", new Date())
    res.json(response)
  })
)

app.get('/:id',
  [param('id'), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deleted = await EtherBlockService.findByUid(Number(id));
    const response = createResponse("OK", deleted, undefined)
    res.json(response)
  })
)

app.post('/',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
   //  const { count }: any = req.body;
   //  const dataArray: any = await getBreeds(count);
   //  const newUser: any = await Promise.all(dataArray.data.map((data: any) => Post.createNew(data.currentSlot, data.result)))
   //  res.json(newUser)
   const dotenv = require('dotenv').config();
var request = require('request');

var headers = {
	'Content-Type': 'application/json'
};

var dataString = '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",true], "id":1}';

var options = {
	url: `https://rinkeby.infura.io/v3/87ac8ac7975e4b4d99c5840792f0884d`,
    // url:"https://rinkeby.infura.io/v3/87ac8ac7975e4b4d99c5840792f0884d#relay_sendTransaction",
	method: 'POST',
	headers: headers,
	body: dataString,
};
var obj:any = {}
     async function callback(error:any, response:any, body:any) {
	if (!error && response.statusCode == 200) {
		var json = response.body;
		 obj = JSON.parse(json);
		console.log(obj,"======");
     const abc = await EtherBlockService.createNew(obj?.jsonrpc,obj?.id,obj?.result)
     console.log(abc,"_________________");
     
		
	}
}

request(options, callback);
res.send("created")

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
    const deleted = await EtherBlockService.deleteById(Number(id));
    const response = createResponse("OK", "Success", undefined)
    res.json(response)
  })
)

app.use(expressErrorHandler);

export default app
