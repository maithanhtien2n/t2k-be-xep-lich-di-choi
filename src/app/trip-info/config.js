const sequelize = require("../../configs/connectDatabase");
const { DataTypes } = require("sequelize");

const TripInfo = sequelize.define(
  "TripInfo",
  {
    trip_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "trip_info",
    timestamps: false,
  }
);

module.exports = {
  TripInfo,
};
