const { DataTypes } = require("sequelize");

module.exports = sequelize => {
    sequelize.define(
        "whatsapp",
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
            body: {
                type: DataTypes.STRING,
            },

            datosTwilio: {
                type: DataTypes.JSON
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
