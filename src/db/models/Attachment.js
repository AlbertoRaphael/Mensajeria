const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "attachment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
