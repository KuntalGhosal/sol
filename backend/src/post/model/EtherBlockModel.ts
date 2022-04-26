import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../../db';

export interface TEtherModelPost {
  accounts?: string;
  data?: string;
  programId?:string;
}

type TEtherModelPostModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let EtherBlock: TEtherModelPostModel<TEtherModelPost & Model> = <TEtherModelPostModel<TEtherModelPost & Model>>db.define('ether_block',
  {
    jsonrpc: {
      type: Sequelize.STRING,
      allowNull: true,
    }, 
    Id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    baseFeePerGas: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    difficulty: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    
    extraData: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    gasLimit: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    gasUsed: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    hash: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    logsBloom: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    miner: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    mixHash: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    nonce: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    number: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    parentHash: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    receiptsRoot: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    sha3Uncles: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    size: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    stateRoot: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    timestamp: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    totalDifficulty: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    transactionsRoot: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    uncles: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
  },
  {
    freezeTableName: true
  }
);

export default EtherBlock;