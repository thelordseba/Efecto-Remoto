const axios = require("axios"); 
const { getOne } = require("../controllers/getOne_confirmedOrder.js")

const { PROD_ACCESS_TOKEN } = process.env

class PaymentService {
    constructor() {
      this.tokensMercadoPago = {
        prod: {},
        test: {
            access_token:  PROD_ACCESS_TOKEN
        }
      }; 
        // declaramos de la siguiente manera el token
        // para que sea más fácil cambiarlo dependiendo del ambiente
      this.mercadoPagoUrl = "https://api.mercadopago.com/checkout"; 
        // declaramos la url en el constructor para poder accederla a lo largo de toda la class
    }
    async createPaymentMercadoPago(props) {  
        const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`; 
        
        
      try {
        const request = await axios.post(url, preferences, { // hacemos el POST a la url que declaramos arriba, con las preferencias
          headers: { // y el header, que contiene content-Type
            "Content-Type": "application/json"
            }
        });
        return request.data; // devolvemos la data que devuelve el POST
      } catch (e) {
        console.log(e); // mostramos error en caso de que falle el POST
      }
    }    
}
//NOTA: TODAS las URLS que usemos tienen que ser reales, 
//si prueban con localhost, va a fallar

module.exports = PaymentService;