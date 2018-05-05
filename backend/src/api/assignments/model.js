import Sequelize from "sequelize";

import { DB } from "../../config";

export default DB.define("assignments", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  dueDate: {
    type: Sequelize.DATE
  },
  class: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  tableName: "assignments"
});
