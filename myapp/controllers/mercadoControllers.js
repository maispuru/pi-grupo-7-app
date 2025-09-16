const dbp = require("../localData/products")
const dbu = require("../localData/products")
let productos = dbp.lista
let usuarios = dbu.lista
let comentarios = dbp.lista.comentarios

function todoComentarios() {
    let array = [];
    numComentarios=0
    for (let i = 0; i < array.productos; i++) {
        let idP= productos[i].id 
        for (let i = 0; i < array.comentarios; i++) {
            let idC= comentarios.idProducto
            if (idP==idC) {
                numComentarios = numComentarios+1
                array.push([idP,numComentarios])
            }
        }
        numComentarios=0
    return array
    }
}

function detalleUsuario(ids) {
    let array = [];
    for (let i = 0; i < usuarios.length; i++) {
        let id = usuarios[i].id
        if (ids==id) {
            array.push(usuarios[i])
            
        }
    }
    return
}

function productosUruarios(ids) {
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
        let id = productos[i].id   
        if (ids==id) {
            array.push(productos[i])
        }
    }
    return array
}

function comentarioProducto(ids) {
    let array = [];
    for (let i = 0; i < array.comentarios; i++) {
        let id = comentarios[i].idProducto  
        if (ids==id) {
            array.push(comentarios[i].comentario)
        }
    }
    return array
}

const mercadoController= {
    showListadoProductos : function (req, res) {
        return res.render("index",{
        listaProductos:productos,
        comentariosTotal:todoComentarios(),
    } );
    },
    showElUsuario: function (req, res) {
        let idEnviado = req.params.id;
        let datoUsuarios = detalleUsuario(idEnviado);
        let datoUsuariosProductos = productosUruarios(idEnviado);
        return res.render("profile",{
            infoUsuario:datoUsuarios,
            produUsuario:datoUsuariosProductos,
            comentariosTotal:todoComentarios(),
    } );
    },
    showPorProducto : function (req, res) {
        let idEnviado = req.params.id;
        let detallesProducto = producto(idEnviado);
        let detalleComentarios = comentarioProducto(idEnviado);
        return res.render("product",{
            listaProducto:detallesProducto,
            productoComentarios:detalleComentarios,
    } );
},
}
module.exports = mercadoController ;