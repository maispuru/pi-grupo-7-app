module.exports = function (sequelize, dataTypes) {
    let alias = "Comentarios";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        idUsuario: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        idProducto: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        comentario: {
            type: dataTypes.TEXT
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: "comentarios",
        timestamps: false,
        underscored: true
    };

    let Comentarios = sequelize.define(alias, cols, config);

    Comentarios.associate = function(models) {
        Comentarios.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "idUsuario"
        });
        Comentarios.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "idProducto"
        });
    };

    return Comentarios;
}; 