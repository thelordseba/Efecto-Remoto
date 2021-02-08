const server = require('express').Router();
const { Order, User, Product, OrderLine, Image } = require('../db.js');

//Ruta que crea una nueva orden.                           
server.post('/:userId', async (req, res, next) => {         
    try{
        const order = await Order.create({
            userId: req.params.userId,
            startDate: Date.now(),       
            completionDate: Date.now(),      
            status: 'cart'
        })           
        res.json(order);
    }catch(error){
        next(error);          
    }        
})   

//S38: Ruta para agregar Item al Carrito.                         
//Recibe el userId por parametro y en el body el productId (producto a agregar) y la cantidad.
server.post('/:userId/cart', async (req, res, next) =>{ 
    const { productId, quantity, price } = req.body;
    try{    
        const order = await Order.findOne({
            where: {
                userId: req.params.userId,
                status: 'cart'
            }
        });         
        const product = await Product.findByPk(productId)
        await order.addProduct(product, {through: { quantity, price }}) 
        res.json(product);
    } catch(error){
        next(error);
    }    
});
  
//Ruta que agrega items al carrito.                                    
//Recibe el orderId por parámetro y en el body el productId (producto a agregar) y la cantidad.
server.post('/:orderId/addItem', async (req, res, next) =>{
    try{    
        const order = await Order.findByPk(req.params.orderId);         
        const product = await Product.findByPk(req.body.productId)
        await order.addProduct(product, {through: { price: product.price, quantity: req.body.quantity }      
    }) 
    await order.addProduct(product);
    res.json(product);
    } catch(error){
        next(error);
    }    
  });

//S39: Ruta que retorne todos los items del Carrito.     FALTA TRAER LOS DATOS DE LOS PRODUCT -- Esta retornando los orderLine 
server.get('/:userId/cart', async (req, res, next) => {
    console.log("entró")
    try{
        const order = await Order.findOne({
            where:{
                userId: req.params.userId,
                status: 'cart'
            }         
        }); 
        const items = await OrderLine.findAll({
            where:{
                orderId: order.id
            }
        });     
        res.json(items)        
    } catch(error){
        next(error);
    }  
});

 //Ruta para obtener el carrito completo.                           
 server.get('/:userId/shopping-cart', async (req, res, next) => {
    try{
        const order = await Order.findOne({
            where:{
                userId: req.params.userId,
                status: 'cart'
            },
            include: [{model: Product, include: {model: Image}}, {model: User}]
        });   
        res.json(order)        
    } catch(error){
        next(error);
    }  
});
 
//S40: Ruta para vaciar el carrito                 
server.delete('/:userId/cart', async (req, res, next) => {
    try{
        const order = await Order.findOne({
            where: {
                userId: req.params.userId,
                status: 'cart'
            }
        });  
        await OrderLine.destroy({
            where:{
                orderId: order.id
            }
        });       
        res.send("Carrito vacío.")
    } catch(error) {  
        next(error)      
    }
});

//Ruta para eliminar 1 item del carrito. (recibe)
server.delete('/:orderId/:productId', async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        const productId = req.params.productId
        const item = await OrderLine.findOne({
            // where: { [Op.or]: [{
            //     orderId: {[Op.like]: `${orderId}`},
            //     productId: {[Op.like]: `${productId}`}
            // }]
            // }
            where: {
                orderId: orderId,
                productId: productId,
            }
        });
        await item.destroy();  
        res.send("Item eliminado.")
    } catch(error){  
        next(error)    
    }
});

//S41: Ruta para editar las cantidades del carrito                                         
//Recibe el userId por parametro y el productId y la cantidad a editar (quantity) por body
server.put('/:userId/cart', async (req, res, next) => {
    try{
        // console.log(req.params.userId)
        const order = await Order.findOne({
            where: {
                userId: req.params.userId,
                status: 'cart'
            }
        });  
        // console.log(order)
        const product = await OrderLine.findOne({
            where: {
                orderId: order.id,
                productId: req.body.productId
            }            
        });
        await product.update({
            quantity: req.body.quantity
        })
        res.json(product);
    } catch(error){  
        next(error)      
    }
});

//S44: Ruta que retorne todas las ordenes de un determinado status.             
//Recibe status por query string
server.get('/', async (req, res, next)=> {
    const status = req.query.status
    try{
        let order; 
        if (status) {
            order = await Order.findAll({
               where:{
                   status : req.query.status        //Status => ['cart', 'created', 'processing', 'cancelled', 'completed']
               },
               include: [
                   { model: User },
                   { model: Product }           
               ]
           });
        }
        else {
            order = await Order.findAll({
    
                include: [
                    { model: User },
                    { model: Product }           
                ]
            });
         }
         res.status(200).json(order);       
    } catch(error){        
        next(error);
    }    
})

//S45: Ruta que retorne todas las Ordenes de un usuario    
server.get('/:userId/orders', async (req, res, next)=> {
    try{    
        const order = await Order.findAll({
               where:{
                   userId : req.params.userId
               },
               include: [                   
                   { model: Product }           
               ]
           });
        res.status(200).json(order);            
    } catch(error){        
        next(error);
    }    
})

//S46 Crear una ruta que retorne una orden en particular    
server.get('/:orderId', async (req, res, next)=>{
    try{      
        const order = await Order.findOne({
            where:{
                id: req.params.orderId
            },        
            include:[
                { model: User },
                { model: Product }
            ]
        });
        res.json(order)
    }catch(error)
    {
        next(error)
    }
});

//S47: Ruta para modificar una Orden.                               
//Recibe orderId por parametro y los atributos a modificar 
//por body --> status, compltionDate, rating, reviews
server.put('/:orderId', async (req, res, next) => {   
    try{  
        const order = await Order.findByPk(req.params.orderId);
        await order.update({            
            completionDate: req.body.completionDate,
            status: req.body.status,
            rating: req.body.rating,
            review: req.body.review                                   
        });
        res.json(order)    
    }catch(error){
        next(error);        
    }
});


module.exports = server;