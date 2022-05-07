import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import EtherBlockService, { TFilter } from "../service/EtherBlockService";
import axios from "axios";
import {
  expressQAsync,
  expressErrorHandler,
  validate,
  createResponse,
} from "../../helper";
import EtherTransactionsService from "../service/EtherTransactionsService";
const app = express.Router();
// var Eth = require('web3-eth');

// // "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
// var eth = new Eth(Eth.givenProvider || 'https://mainnet.infura.io/v3/87ac8ac7975e4b4d99c5840792f0884d');

// or using the web3 umbrella package

var Web3 = require("web3");
var web3 = new Web3(
  Web3.givenProvider ||
    "https://mainnet.infura.io/v3/87ac8ac7975e4b4d99c5840792f0884d"
);
const getSingleBlock = async (number: any) => {
  const data = await web3.eth.getBlock(number);

  return data;
};
const getTransactions = async (transId: any) => {
  const data = await web3.eth.getTransaction(transId);

  return data;
};

app.get(
  "/",
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const dataArray :any =await getBreeds();
    // if(dataArray.data){
    //   console.log(dataArray);

    // }
    // console.log("Start Time:", new Date())
    const users = await EtherBlockService.findAll();
    const response = createResponse("OK", users, undefined);
    // console.log("End Time:", new Date())
    res.json(response);
  })
);

app.get(
  "/:id",
  [param("id"), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const deleted = await EtherBlockService.findByUid(Number(id));
    const response = createResponse("OK", deleted, undefined);
    res.json(response);
  })
);

app.post(
  "/",
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    var { count, blockId }: any = req.body;
    var blockData: any = [];
    var dataArray: any = [];
    var newUser: any = [];
    var transId: any = 0;
    // console.log(allSlotId);
    let programArray: any = [];
    // if (allSlotId === null) {
    for (let i = 0; i < count; i++) {
      const allSlotId = await EtherBlockService.findByNumber(blockId);
      if (allSlotId === null) {
        blockData = await getSingleBlock(blockId);
        const data = await EtherBlockService.createNew(
          blockData.baseFeePerGas,
          blockData.difficulty,
          blockData.extraData,
          blockData.gasLimit,
          blockData.gasUsed,
          blockData.hash,
          blockData.logsBloom,
          blockData.miner,
          blockData.mixHash,
          blockData.nonce,
          blockData.number,
          blockData.parentHash,
          blockData.receiptsRoot,
          blockData.sha3Uncles,
          blockData.size,
          blockData.stateRoot,
          blockData.timestamp,
          blockData.totalDifficulty,
          blockData.transactions,
          blockData.transactionsRoot,
          blockData.uncles
        );
        newUser =
          blockData &&
          (await Promise.all(
            blockData.transactions.map(async (data: any, index: number) => {
              const allTrans = await getTransactions(data);
              
              await  EtherTransactionsService.createNew(
                  allTrans.accessList,
                  allTrans.blockHash,
                  allTrans.blockNumber,
                  allTrans.chainId,
                  allTrans.from,
                  allTrans.gas,
                  allTrans.gasPrice,
                  allTrans.hash,
                  allTrans.input,
                  allTrans.maxFeePerGas,
                  allTrans.maxPriorityFeePerGas,
                  allTrans.nonce,
                  allTrans.r,
                  allTrans.s,
                  allTrans.to,
                  allTrans.transactionIndex,
                  allTrans.type,
                  allTrans.v,
                  allTrans.value
              );
              // Trans.createNew(blockId, data.meta, data.transaction)
            })
          ));
      }
      blockId = blockId - 1;
    }

    //

    // console.log("=======", dataArray);
    // newUser = dataArray && await Promise.all(dataArray.data.map((data: any,index:number) => {
    //   transId=index

    //   )
    // }))

    // }
    // }
    res.send("created");
  })
);

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

app.delete(
  "/:id",
  [param("id"), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const deleted = await EtherBlockService.deleteById(Number(id));
    const response = createResponse("OK", "Success", undefined);
    res.json(response);
  })
);

app.use(expressErrorHandler);

export default app;
