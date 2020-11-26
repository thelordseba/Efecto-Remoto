import { useState } from "react";
import { useSelector } from "react-redux";
import useUser from "./useUser.js"
import axios from "axios"
import { useHistory } from "react-router-dom";

function useCart () {
    const currentUser = useSelector((state) => state.currentUser);
    const history = useHistory();

    let localCart = localStorage.getItem("cart");
    const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
    
    const addItem = (product, quantity) => {
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
        if(currentUser) {
            const prod = {
                productId: product.id,
                quantity: product.quantity,
                price: product.price,
            };
            try {
                axios.post(`http://localhost:3001/orders/${currentUser.id}/cart`, prod);
            } catch (error) {
                return alert(error);
            }
        };
    };

    const editItem = (itemID, value) => {
        let cartCopy = [...cart];
        let existentItem = cartCopy.find(
          (cartItem) => cartItem.id === parseInt(itemID)
        );
        if (!existentItem) {
          alert("Hubo un error.");
        } else {
          existentItem.quantity = parseInt(value);
        }
        if (existentItem.quantity <= 0) {
          cartCopy = cartCopy.filter((item) => item.id !== parseInt(itemID));
        }
    
        setCart(cartCopy);
        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem("cart", cartString);
    };

    const onRemoveProduct = (productId) => {
        let filteredList = cart.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(filteredList));
        setCart(filteredList);
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