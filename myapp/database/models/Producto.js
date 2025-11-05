module.exports = function (sequelize, dataTypes) {
    let alias = "Producto";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        idUsuario: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        imagenArchivo: {
            type: dataTypes.STRING(500)
        },
        nombre: {
            type: dataTypes.STRING(500)
        },
        descripcion: {
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
        tableName: "productos",
        timestamps: false,
        underscored: true
    };

    let Producto = sequelize.define(alias, cols, config);
    
    Producto.associate = function(models) {
        Producto.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "idUsuario"
        });
        Producto.hasMany(models.Comentarios, {
            as: "comentarios",
            foreignKey: "idProducto"
        });
    };

    return Producto;
};