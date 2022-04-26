import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from "../db"

export interface TTransPost {
  meta?: string;
  transaction?: string;
}

type TTransPostModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Transaction: TTransPostModel<TTransPost & Model> = <TTransPostModel<TTransPost & Model>>db.define('transactions_solana',
  {
    blockId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  
    meta: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    transaction: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    // status: {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: true
    // },
  },
  {
    freezeTableName: true
  }
);

export default Transaction