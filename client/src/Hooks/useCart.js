import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function useCart () {
    const currentUser = useSelector((state) => state.currentUser);

    let localCart = localStorage.getItem("cart");
    const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
    
    const addItem = async (product, quantity) => {
        let cartCopy = [...cart];
        let { id } = product;
        let existingItem = cartCopy.find((cartItem) => cartItem.id === id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartCopy.push(product);
            product.quantity = parseInt(quantity);
        }
        setCart(cartCopy);
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart);
        if(currentUser?.length !== 0) {
            const prod = {
                productId: product.id,
                quantity: quantity,
                price: product.price,
            };
            try {
                await axios.post(`${process.env.REACT_APP_API}/orders/${currentUser.id}/cart`, prod);
            } catch (error) {
                return alert(error);
            }
        };
    };

    const editItem = async(itemID, value) => {
        let cartCopy = [...cart];
        let existentItem = cartCopy.find((cartItem) => cartItem.id === parseInt(itemID));
        if (!existentItem) { alert("Hubo un error.Por favor, volvé a intentar.")}
        else { existentItem.quantity = parseInt(value)};
        if (existentItem.quantity <= 0) {
          cartCopy = cartCopy.filter((item) => item.id !== parseInt(itemID));
        }
        setCart(cartCopy);
        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem("cart", cartString);
        if(currentUser?.length !== 0) {
            const prod = {
                productId: itemID,
                quantity: value,
            };
            try {
                await axios.put(`${process.env.REACT_APP_API}/orders/${currentUser.id}/cart`, prod);
            } catch (error) {
                return alert(error);
            }; 
        }
        window.location.reload();
    };

    const onRemoveProduct = async (productId) => {
        let filteredList = cart.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(filteredList));
        setCart(filteredList);
        if(currentUser?.length !== 0) {
            try {
                await axios.get(`${process.env.REACT_APP_API}/orders/${currentUser.id}/shopping-cart`)
                .then(response => {
                    return axios.delete(`${process.env.REACT_APP_API}/orders/${response.data.id}/${productId}`);
                })
                .catch(error => console.log(error))
            } catch (error) {
                return alert(error);
            }; 
        };
        window.location.reload();
    };

    return {
        cart,
        setCart,
        addItem,
        editItem,
        onRemoveProduct,
    }
}

export default useCart;