import React from 'react';
import { OrderItem } from '../../types/orders';

interface ShoppingCartProps {
    orderItemList: OrderItem[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ orderItemList }) => {
    return (
        <div
            style={{
                margin: '20px auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '24px',
                    marginBottom: '20px',
                }}
            >
                Shopping Cart
            </h2>
            <ul
                style={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                }}
            >
                {orderItemList.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px',
                            marginBottom: '10px',
                            borderBottom: '1px solid #ddd',
                            fontSize: '16px',
                            color: '#555',
                        }}
                    >
                        <span>{item.menuItemID.name}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: ${item.menuItemID.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingCart;
