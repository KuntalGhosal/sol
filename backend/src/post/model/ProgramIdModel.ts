import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../../db';

export interface TProgramPost {
  accounts?: string;
  data?: string;
  programId?:string;
}

type TTransPostModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Program: TTransPostModel<TProgramPost & Model> = <TTransPostModel<TProgramPost & Model>>db.define('programs_solana',
  {
    blockId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }, 
    transId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    accounts: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
    data: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    programId: {
      type: Sequelize.TEXT,
      allowNull: true
    },
  },
  {
    freezeTableName: true
  }
);

export default Program