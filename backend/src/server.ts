import express from 'express';
import userRoutes from './post/routes'
import transRoute from './post/TransRoutes'
import EtherRoute from './post/routes/EtherBlockRoutes'
import cors from 'cors';
import * as dotenv from "dotenv"
import * as bodyparser from 'body-parser';
import db from "./db"
import { Sequelize } from 'sequelize/types';
dotenv.config()

// const { Client } = require('pg')

// const client = new Client({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'postgres',
//   database: "xcpep"
// })

// client.connect();
// // pools will use environment variables
// // for connection inform
// // clients will also use environment variables
// // for connection information

// const getUsers = async (req: any, res: any) => {
//    console.log("Hello World")
//    try {
//       const result = await client.query('SELECT * from authorization_user');
//       console.log("Hello World22")

//       res.send(result.rows);
      
//    } catch (error) {
//       res.send(error)
//    }

// }

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
app.use("/block", userRoutes)
app.use("/trans",transRoute)
app.use("/etherData",EtherRoute)
// app.use("/getUsers/",getUsers)



const PORT = Number(process.env.SPORT) || 5000;
db.sync({ alter: true,force:false }).then(() => app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) }))