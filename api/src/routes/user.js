const server = require('express').Router()

//S38 : Crear Ruta para agregar Item al Carrito
//POST /shopping-cart: Agrega un artículo al carrito de compras 
//(enviando algunos datos con el artículo que estás agregando 
//y el monto en el cuerpo de la solicitud)

//POST /users/:idUser/cart
server.post('/user/:idUser/cart', (req, res)=>{
    Order.findOrCreate({
        where: {},
        defaults:{}
    }).then(order =>{
        orderProduct.findOrCreate({
            where: {},
            defaults: {},
        }) //entra la categoría?
    })
})

//podria ser tambien

// server.post('/cart', isAuthenticated, async (req, res) => {
//     try {
//       const order = await Order.findOrCreate({
//         where: {
//           userId: 
//           state: 
//         },
//       })

//tratando de entender documentacion


//S39 : Crear Ruta que retorne todos los items del Carrito
//DESCRIPCION:
//Crear Ruta que retorne todos los items del Carrito
//El carrito de un usuario va a ser la última ORDEN abierta que tenga el usuario.
// Cuando el usuario haga el checkout, esa orden se cerrará 
//y se creará una nueva orden vacía que este abierta.

//GET /users/:idUser/cart   GET /shopping-cart: Obtenga el carrito de compras.



//S40 : Crear Ruta para vaciar el carrito
// Descripción
// Crear Ruta para vaciar el carrito

// DELETE /users/:idUser/cart/