import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../../db';

export interface TEtherTransactionsModelPost {
  accounts?: string;
  data?: string;
  programId?:string;
}

type TEtherTransactionsModelPostModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let EtherTransactions: TEtherTransactionsModelPostModel<TEtherTransactionsModelPost & Model> = <TEtherTransactionsModelPostModel<TEtherTransactionsModelPost & Model>>db.define('ether_transactions',
  {
    accessList:  {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    }, 
    blockHash:  {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    blockNumber: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    chainId: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    from:  {
        type: Sequelize.TEXT,
        allowNull: true
      },
      gas:   {
        type: Sequelize.TEXT,
        allowNull: true
      },
      gasPrice:    {
        type: Sequelize.TEXT,
        allowNull: true
      },
      hash:     {
        type: Sequelize.TEXT,
        allowNull: true
      },
      input:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      maxFeePerGas:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      maxPriorityFeePerGas:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      nonce:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      r:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      s:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      to:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      transactionIndex:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      type:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      v:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
      value:      {
        type: Sequelize.TEXT,
        allowNull: true
      },
  },
  {
    freezeTableName: true
  }
);

export default EtherTransactions;