const server = require('express').Router()
const { Product, User, Order, OrderLine} = require('../db.js')

//S38 : Crear Ruta para agregar Item al Carrito
//POST /shopping-cart: Agrega un artículo al carrito de compras 
//(enviando algunos datos con el artículo que estás agregando 
//y el monto en el cuerpo de la solicitud)

//POST /users/:idUser/cart
server.post('/cart', isAuthenticated, async (req, res) => {
    try {
      const order = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          state: 'create',
        },
      })
  
      let productsLoad = req.body.products.map((prod) =>
        OrderLine.findOrCreate({
          where: {
            orderId: order[0].id,
            productId: prod.productId,
            price: prod.price,
          },
        })
      )
  
      await Promise.all(productsLoad).then((prod) =>
        prod.map((product, index) => {
          if (req.body.products[index].quantity) {
            product[0].update({
              quantity: req.body.products[index].quantity,
            })
          } else {
            product[0].update({
              where: {
                quantity: product[0].increment('quantity'),
              },
            })
          }
        })
      )
  
      const products = await Order.findOne({
        where: { userId: req.user.id, 
                 state: 'create' },
        include: [Product],
      })
  
      res.send(products)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  
//tratando de entender documentacion


//S39 : Crear Ruta que retorne todos los items del Carrito
//DESCRIPCION:
//Crear Ruta que retorne todos los items del Carrito
//El carrito de un usuario va a ser la última ORDEN abierta que tenga el usuario.
// Cuando el usuario haga el checkout, esa orden se cerrará 
//y se creará una nueva orden vacía que este abierta.

//GET /users/:idUser/cart   GET /shopping-cart: Obtenga el carrito de compras.

server.get('users/:userId/cart', (req, res) => {
    Order.findOrCreate({
        where: { userId: req.params.userId, 
                 status: "open" },
        defaults: { userId: req.params.userId, 
                    status: "open", totalPrice: 0 }
    }).then(order => {
        OrderLine.findAll({
            where: { orderId: order[0].id },
            include: [{ model: Product }, 
                      { model: Order }]
        }).then(orderLine => { res.json(orderLine); }).catch(error => { res.status(400).json({ error }) })
    })
})


//S40 : Crear Ruta para vaciar el carrito
// Descripción
// Crear Ruta para vaciar el carrito

// DELETE /users/:idUser/cart/


//S41 : Crear Ruta para editar las cantidades del carrito
//Descripción
// Crear Ruta para editar las cantidades del carrito

// PUT /users/:idUser/cart