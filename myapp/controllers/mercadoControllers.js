const dbp = require("../localData/products"); 
const dbu = require("../localData/user");    

let productos = dbp.productos; 
let usuario   = dbu.usuario;

const mercadoController= {
    index : function (req, res) {
        let comentarios = function todoComentarios() {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let idP = productos[i].id;
                let comentarios = productos[i].comentarios; 
                array.push([idP, comentarios]);
            }
            return array;
        }
        return res.render("index",{
        listaProductos:productos,
        comentariosTotal:comentarios(),
    } );
    },
    showElUsuario: function (req, res) {
        let idEnviado = req.params.id;
        let comentarios = function todoComentarios() {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let idP = productos[i].id;
                let comentarios = productos[i].comentarios; 
                array.push([idP, comentarios]);
            }
            return array;
        }
        let datoUsuariosProductos = function productosUruarios() {
            let ids = usuario.id
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].idUsuario
                if (ids==id) {
                    array.push(productos[i])
                }
            }
            return array
        }
        return res.render("profile",{
            infoUsuario:usuario,
            produUsuario:datoUsuariosProductos(idEnviado),
            comentariosTotal:comentarios(idEnviado),
    } );
    },
    showPorProducto: function (req, res) {
        let idEnviado = req.params.id;
        let detallesProducto = function producto(ids) {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].id;
                if (ids == id) {
                    array.push(productos[i]);
                }
            }
            return array;
        }
        let detalleComentarios = function comentarioProducto(ids) {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].id;
                if (ids == id) {
                    array = productos[i].comentarios;
                }
            }
            return array;
        }
        return res.render("product", {
            listaProducto: detallesProducto(idEnviado),
            productoComentarios: detalleComentarios(idEnviado)
        });
    },
    storeRegister: function (req, res) {
        return res.render("register",{

    } );
    },
    showLog: function (req, res) {
        return res.render("login",{

    } );
    },
    showResultados: function (req, res) {
        let comentarios = function todoComentarios() {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let idP = productos[i].id;
                let comentarios = productos[i].comentarios; 
                array.push([idP, comentarios]);
            }
            return array;
        }
        return res.render("search-results",{
        listaProductos:productos,
        comentariosTotal:comentarios(),
    } );
    },
    
    showCreate: function (req, res) {
        return res.render("product-add",{
    } );
    },
    showEdit: function (req, res) {
        return res.render("product-edit",{
    } );
    },
}
module.exports = mercadoController ;