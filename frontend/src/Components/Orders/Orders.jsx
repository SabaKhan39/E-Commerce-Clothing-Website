import React, { useContext, useEffect, useState } from 'react';
import './Orders.css';
import { ShopContext } from '../../Context/ShopContext';

const Orders = () => {
    const { orders, fetchOrders, removeOrder } = useContext(ShopContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            await fetchOrders();
            setLoading(false);
        };
        loadOrders();
    }, [fetchOrders]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleRemoveOrder = (orderId) => {
        removeOrder(orderId)
            .then(response => {
                console.log(response); // Optional: Log success message or handle UI updates
            })
            .catch(error => {
                console.error('Error removing order:', error); // Handle error feedback to user
            });
    };

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className='orders-list'>
                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    orders.map(order => (
                        <div key={order._id} className='orders-item'>
                            <p>Order ID: {order._id}</p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p>Total: ₹{order.totalAmount}</p>
                            <div className='orders-products'>
                                {order.orderDetails.map(item => (
                                    <div key={item.id} className='orders-product'>
                                        <img src={item.image} alt={item.name} />
                                        <div>
                                            <p>{item.name}</p>
                                            <p>Price: ₹{item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='order-remove-button'>
                            <button onClick={() => handleRemoveOrder(order._id)}>Remove Order</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
