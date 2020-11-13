const server = require('express').Router();
const { Order, User, Product, OrderLine } = require('../db.js');



//Crear carrito en BD
server.post('/', async (req, res, next) => {     
    try{
        const order = await Order.create({
            userId: req.body.userId,
            startDate: req.body.startDate,
            completionDate: req.body.completionDate,
            status: req.body.status
        })

        await req.body.orderLines.map(orderLine =>{
            OrderLine.create({
                productId: orderLine.productId,
                price: orderLine.price,
                quantity: orderLine.quantity                                
            })
            order.setOrderLine(orderLine)            
        })        
        res.json(order);
    }catch(error){
        next(error);          

    }        
})
    


//S38 : Crear Ruta para agregar Item al Carrito
//POST /shopping-cart: Agrega un artículo al carrito de compras 
//(enviando algunos datos con el artículo que estás agregando 
//y el monto en el cuerpo de la solicitud)

//POST /users/:idUser/cart
server.post('/:idUser/cart/', async (req, res) => {   /// se borró isAuthenticated
    try {
      const order = await Order.findOrCreate({
        where: {
          userId: req.params.idUser, 
          status: 'cart'
        },
      })
  
      
      let productsLoad = req.body.products.map((prod) =>
        OrderLine.findOrCreate({
          where: {
            orderId: order[0].id, productId: prod.productId, price: prod.price,
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
              where: { quantity: product[0].increment('quantity'),
              },
            })
          }
        })
      ) 
        const products = await Order.findOne({
        where: { userId: req.user.id, state: 'create' },
        include: [Product],
      })
       res.send(products)
     } 
      catch (error) {
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

server.get('/:userId/cart', (req, res) => {
    Order.findOrCreate({
        where: { userId: req.params.userId, status: "open" },
        defaults: { userId: req.params.userId, status: "open", totalPrice: 0 }
    }).then(order => {
        OrderLine.findAll({
            where: { orderId: order[0].id },
            include: [{ model: Product }, { model: Order }]
        }).then(orderLine => { res.json(orderLine); }).catch(error => 
            { res.status(400).json({ error }) })
    })
})


//S40 : Crear Ruta para vaciar el carrito
// Descripción
// Crear Ruta para vaciar el carrito
// DELETE /users/:idUser/cart/

server.delete('/:userId/cart', (req, res) => {
    Order.findOne({
        where: { userId: req.params.userId, status: "open" }
    }).then(order => {
        OrderLine.destroy({
            where: { orderId: order.id }
        }).then(deleteOrder => {
            if (deleteOrder === 1) { res.status(200).json({ message: "Has been successfully deleted" }); 
          }
            else { res.status(404).json({ message: "Cart not found" }) }
        }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
}) 


//S41 : Crear Ruta para editar las cantidades del carrito
//Descripción
// Crear Ruta para editar las cantidades del carrito
// PUT /users/:idUser/cart

server.put('/:userId/cart', (req, res) => {
    Order.findOne({
        where: { userId: req.params.userId, status: "open" }
    }).then(order => {
        OrderLine.findOne({
            where: { orderId: order.id, productId: req.body.productId }
        }).then(orderLine => {
            if(req.body.quantity === 'add') {
               orderLine.update({
                    quantity: orderLine.quantity + 1
                })
                res.status(200).json({ orderLine });
            }
            if(req.body.quantity === 'subtract') {
                orderLine.update({
                    quantity: orderLine.quantity - 1
                })
                res.status(200).json({ orderLine });
            }
        })
    }).catch(error => { res.status(400).json({ error })
  })
})

//------------------------------------------------------------------------------------------------
//S44 Crear Ruta que retorne todas las ordenes (retorna las ordenes de un determinado status)
server.get('/', (req, res, next)=>{
    let {status} = req.query.status;
    Order.findAll({
        where:{
            status : status        //Status posibles => ['cart', 'created', 'processing', 'cancelled', 'completed']
        },
        include: [
            {
                model: User
            },
            {
                model: OrderLine,
                include: [
                    {
                        model:Product
                    }
                ]
            }
        ]
    })
    .then(order=>{
        res.status(200).json(order);
    })
    .catch(next);
});

//S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
//GET /users/:id/orders

server.get('/:userId/orders', (req, res) => { //es necesario usar el next?
    Order.findOrCreate({
        where: { userId: req.params.idUser, status: "closed" }
    }).then(orders => { res.json(orders); }).catch(error => { res.status(400).json({ error }) })
})

//S46 Crear una ruta que retorne una orden en particular
server.get('/:id', (req, res, next)=>{
    Order.findOne({
        where:{
            id: req.params.id
        }, 
        include: [
            {
                model: User
            },
            {
                model: OrderLine,
                include: [
                    {
                        model:Product
                    }
                ]
            }
        ]
    })
    .then(order=>{
        res.status(200).json(order);
    })
    .catch(next)
});

//S47 : Crear Ruta para modificar una Orden
//PUT /orders/:id

server.put('/:id', (req, res) => {
    OrderLine.findOne({
        where: { id: req.params.id }
    }).then(orderLine => {
        orderLine.update({
            productId: req.body.productId,
            quantity: req.body.quantity
        }).then(orderLine => { res.status(200).json({ orderLine }); }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
})


module.exports = server;