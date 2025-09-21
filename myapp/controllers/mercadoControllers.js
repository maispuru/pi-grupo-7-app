const dbp = require("../localData/products"); 
const dbu = require("../localData/user");    

let productos = dbp.productos; 
let usuario   = dbu.usuario;


function todoComentarios() {
    let array = [];
    for (let i = 0; i < productos.length; i++) {
        let idP = productos[i].id;
        let comentarios = productos[i].comentarios; 
        array.push([idP, comentarios]);
    }
    return array;
}

function productosUruarios() {
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

function producto(ids) {
    let array = [];
    for (let i = 0; i < productos.length; i++) {
        let id = productos[i].id;
        if (ids == id) {
            array.push(productos[i]);
        }
    }
    return array;
}

function comentarioProducto(ids) {
    let array = [];
    for (let i = 0; i < productos.length; i++) {
        let id = productos[i].id;
        if (ids == id) {
            array = productos[i].comentarios;
        }
    }
    return array;
}

const mercadoController= {
    index : function (req, res) {
        return res.render("index",{
        listaProductos:productos,
        comentariosTotal:todoComentarios(),
    } );
    },
    showElUsuario: function (req, res) {
        let idEnviado = req.params.id;
        let datoUsuariosProductos = productosUruarios(idEnviado);
        return res.render("profile",{
            infoUsuario:usuario,
            produUsuario:datoUsuariosProductos,
            comentariosTotal:todoComentarios(),
    } );
    },
    showPorProducto: function (req, res) {
        let idEnviado = req.params.id;
        let detallesProducto = producto(idEnviado);
        let detalleComentarios = comentarioProducto(idEnviado);
        return res.render("product", {
            listaProducto: detallesProducto,
            productoComentarios: detalleComentarios
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
        return res.render("search-results",{
        listaProductos:productos,
        comentariosTotal:todoComentarios(),
    } );
    },
    
    create: function (req, res) {
        return res.render("product-add",{
    } );
    },
    edit: function (req, res) {
        return res.render("product-edit",{
    } );
    },
}
module.exports = mercadoController ;