const server = require('express').Router();
const { User } = require('../db.js');
const { Product, User, Order, OrderLine} = require('../db.js');

//S34 Crear Ruta para agregar usuario
server.post('/', (req, res, next) => {
    let {userName, firstName, lastName, isAdmin, email, telephone, password, gitHubId, gmailId, facebookId} = req.body
    User.create({
        userName,
        firstName,
        lastName,
        isAdmin,
        email,
        telephone,
        password,
        gitHubId,
        gmailId,
        facebookId                
    })                
    .then(cat => {
            res.status(201).json(cat);
        })
    .catch(next);
});

//S35 Crear Ruta para modificar usuario
server.put('/:userId', (req, res, next) => {
    let userId = req.params.userId;
    User.update(req.body, {
        where: {
            id: userId
        }
    })
    .then(cat => {
        res.status(200).send(cat);
    })
    .catch(next);
});

//S36 Crear ruta que retorne todos los usuarios
server.get('/', (req, res, next)=>{
    User.findAll()
    .then((user)=>{
        res.status(201).json(user);
    })
    .catch(next);
});

//S37 Crear ruta para eliminar un usuario
server.delete('/:userId', (req, res, next)=>{
    User.findOne({
        where:{
            id: req.params.userId
        }
    })
    .then(user=>{
        if(!user){
            res.status(400).send("ERROR: El usuario que intenta eliminar no existe.");
        }else{     
            user.destroy();
            res.sendStatus(200);       
        }
    })
    .catch(next);       
});

//S38 : Crear Ruta para agregar Item al Carrito
//POST /shopping-cart: Agrega un artículo al carrito de compras 
//(enviando algunos datos con el artículo que estás agregando 
//y el monto en el cuerpo de la solicitud)

//POST /users/:idUser/cart
server.post('/cart', isAuthenticated, async (req, res) => {
    try {
      const order = await Order.findOrCreate({
        where: {
          userId: req.user.id, state: 'create',
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
      ) const products = await Order.findOne({
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

module.exports = server;