module.exports = function (sequelize, dataTypes) {
    let alias = "Usuario";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        usuario: {                  
        type: dataTypes.STRING(500),
        
        },

        contrasena: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        fotoPerfil: {
            type: dataTypes.STRING(500)
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
        tableName: "usuarios",
        timestamps: false,
        underscored: true
    };

    let Usuario = sequelize.define(alias, cols, config);
    
    Usuario.associate = function(models) {
        Usuario.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "idUsuario"
        });
        Usuario.hasMany(models.Comentarios, {
            as: "comentarios",
            foreignKey: "idUsuario"
        });
    };

    return Usuario;
};