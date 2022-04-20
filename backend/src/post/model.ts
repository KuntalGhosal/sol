import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from "../db"

export interface TPost {
  currentSlot?: string;
  result?: string;
}

type TPostModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Post: TPostModel<TPost & Model> = <TPostModel<TPost & Model>>db.define('blocks_solana',
  {
    currentSlot: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    result: {
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

export default Post