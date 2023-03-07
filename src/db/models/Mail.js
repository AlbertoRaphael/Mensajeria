const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "mail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      to: {
        type: DataTypes.STRING,
      },
      from: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.STRING,
      },
      subject: {
        type: DataTypes.STRING,
      },
      wasSent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      createdAt: "sentAt",
      updatedAt: false,
    }
  );
};
