const { Sequelize, DataTypes } = require('sequelize');
const path = require("path");

const DB_PATH = path.resolve(__dirname, "checkout.db");

const sequelize = new Sequelize('checkout', null, null, { dialect: 'sqlite', storage: DB_PATH});

sequelize.authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Unable to connect to database");
  });

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.sync()
  .then(() => {
    console.log("Table created");
  })


module.exports = {
  user: User
} 
