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
    result: {
      type: Sequelize.JSON,
      allowNull: true,
    },

  },
  {
    freezeTableName: true
  }
);

export default EtherBlock;