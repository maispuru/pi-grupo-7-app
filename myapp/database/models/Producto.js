module.exports = function (sequelize, dataTypes ) {
    let alias = "Producto";
    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER
        },
        nombre: {
            type : dataTypes.STRING
        },
       
  	}

    let config = {
        tableName: "productos",
        timestamps: false,
        underscored: true
    }
    
    let Producto = sequelize.define(alias, cols, config);
    return Producto ;
}
