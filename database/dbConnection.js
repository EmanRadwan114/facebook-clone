import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  `mysql://u0w4qq5grhu3e3yw:mv3DlSIkLzwfC96BdRGC@b5eaiwhfxkyfjm6mwnsq-mysql.services.clever-cloud.com:3306/b5eaiwhfxkyfjm6mwnsq`,
  {
    dialect: "mysql",
  }
);

export default sequelize;
