const { Router } = require('express');
const router=Router();
const Producto = require('./Productos.js');
let listadoProductos = new Producto('./productos.txt');

/* GET 'api/productos' -> devuelve todos los productos. */
router.get('/api/productos', (req, res) => {
    let listado = listadoProductos.getProducts();
    if (listado.length === 0) {
        res.send({ error: "No hay productos cargados" })
    } else {
        return res.json(listado);
    }
})

/* GET 'api/productos/:id -> devuelve un producto segùn su id */
router.get('/api/productos/:id', (req, res) => {
    let id = req.params.id;

    if (isNaN(id)){
        res.status(400).send({ error: 'El parámetro no es un número.'})
        return    
    } else {
        if (id > listadoObjetos.length) {
            res.status(400).send({ error: 'Producto no encontrado.'});
        } else {
            let producto = listadoProductos.listProduct(id);
            if (producto == null) {
                res.send({ error: "Producto no encontrado" })
            } else {
                res.json(producto)
            }
        }
    }
})

/* POST 'api/productos -> Recibe y agrega un producto y lo devuelve con su id asignado. */
router.post('/api/productos', (req, res) => {
    listadoProductos.saveProduct(req.body.title, req.body.price, req.body.ruta);
    return res.json({ estado: 'GUARDADO' });
})

/* DELETE 'api/productos/:id -> elimina un producto segùn su id. */
router.delete('/api/productos/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id)){
        res.status(400).send({ error: 'El parámetro no es un número.'})
        return    
    } else {
        if (id > listadoObjetos.length) {
            res.status(400).send({ error: 'Producto no encontrado.'});
        } else {
            listadoProductos.deleteProduct(id);
            return res.json({ estado: 'BORRADO' });
        }
    }
})

/* PUT 'api/productos/:id' -> recibe y actualizA UN producto segun su id. */


module.exports = router;







/* GET 'api/productos/:id -> devuelve un producto segùn su id */
router.get('/api/productos/:id', async (req, res) => {
    const {num} = req.params;
    const productoSeleccionado = await listadoObjetos.getById(num);
    if (isNaN(num)){
        res.status(400).send({ error: 'El parámetro no es un número.'})
        return    
    }
    if (num > listadoObjetos.length) {
        res.status(400).send({ error: 'Producto no encontrado.'});
    }
    res.send(productoSeleccionado);
    
})

/* POST 'api/productos -> Recibe y agrega un producto y lo devuelve con su id asignado. */
router.post('/api/productos', async (req, res) => {
    listadoObjetos.save(req.body.title, req.body.price, req.body.ruta);
    return res.json({ estado: 'GUARDADO' });
})

/* En detalle, que incorpore las siguientes rutas:ç

PUT 'api/productos/:id' -> recibe y actualizA UN producto segun su id.
DELETE 'api/productos/:id -> elimina un producto segùn su id. */

module.exports=router;