import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);


const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {

    const[all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
        .then((response) =>response.json())
        .then((data) => setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response) => response.json())
            .then((data) => setCartItems(data));
        }
    },[])


    const addToCart = (itemId) => {
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}));
       if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/addtocart',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"itemId":itemId})
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
       }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
           .then((response) => response.json())
           .then((data) => console.log(data));
    }
}

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const fetchOrders = async () => {
        if(localStorage.getItem('auth-token')){
            const response = await fetch('http://localhost:4000/api/orders', {
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
            });
            const data = await response.json();
            setOrders(data);
        }
    };

    const createOrder = async (orderDetails, totalAmount, paymentId) => {
        if(localStorage.getItem('auth-token')){
            const response = await fetch('http://localhost:4000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ orderDetails, totalAmount, paymentId }),
            });
            const data = await response.json();
            setOrders((prevOrders) => [...prevOrders, data]);

            setCartItems(getDefaultCart()); 
        }
    };

    const removeOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete order');
            }

            // Optionally handle response data or just return success
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error; // Propagate error for handling in component
        }
    };

    const contextValue = {
        getTotalCartItems, 
        getTotalCartAmount , 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        fetchOrders, 
        createOrder, 
        orders,
        removeOrder};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;