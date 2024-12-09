import { Restaurant } from '../../types/restaurants';
import { MenuItem } from '../../types/restaurants';
import { User } from '../../types/users';
import {  useState } from 'react';
import ShoppingCart from './ShoppingCart';
import { createOrder } from '../../api/orders';
import { ValidatePaymentAPI } from '../../api/payment.ts';
import { Button } from '@mui/material';


interface RestaurantPageProps {
    restaurant: Restaurant;
    user: User;
}

interface menuItemLine {
    menuItemID: MenuItem;
    quantity: number;
}

function RestaurantComponent({ restaurant, user }: RestaurantPageProps) {

    const handleProceedToPayment = async () => {
        if (menuItems.length == 0) return;

        setHandlingPayment(true);
        try {
            setTotalPrice(menuItems.reduce((total, item) => total + item.menuItemID.price * item.quantity, 0));
            //const order = await createOrder(user._id, restaurant._id, menuItems, user.address, totalPrice);
            //console.log('Order created:', order);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handlePayment = async () => {
        try {
            const paymentResponse = await ValidatePaymentAPI(totalPrice, user._id, card);

            if (paymentResponse) {
                const order = await createOrder(user._id, restaurant._id, menuItems, user.address, totalPrice);
                setHandlingPayment(false);
                setOrderComplete(true);
            } else {
            }
        } catch (error) {
            console.error('Error validating payment', error);
        }
    };

    const [menuItems, setMenuItems] = useState<menuItemLine[]>([]);
    const [handlingPayment, setHandlingPayment] = useState<boolean>(false);
    const [orderComplete, setOrderComplete] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [card, setCard] = useState<number>(0);

    const addToCart = (menuItem: MenuItem) => {
        const existingMenuItem = menuItems.find((item) => item.menuItemID._id === menuItem._id);

        if (existingMenuItem) {
            setMenuItems(
                menuItems.map((item) =>
                    item.menuItemID._id === menuItem._id
                        ? { ...existingMenuItem, quantity: existingMenuItem.quantity + 1 }
                        : item
                )
            );
        } else {
            setMenuItems([...menuItems, { menuItemID: menuItem, quantity: 1 }]);
        }
    };

    const onCardChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setCard(e.target.value);
        }
    };

    return (
        <div style={{ width: '50%' }}>
            {!orderComplete ? (
                <>
                    <div
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <h1
                            style={{
                                textAlign: 'center',
                                color: '#333',
                                fontSize: '28px',
                                marginBottom: '20px',
                            }}
                        >
                            {restaurant?.name}
                        </h1>
                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                marginTop: '20px',
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: 'left',
                                            padding: '10px',
                                            borderBottom: '2px solid #ddd',
                                            color: '#555',
                                        }}
                                    >
                                        Menu Item
                                    </th>
                                    <th
                                        style={{
                                            textAlign: 'left',
                                            padding: '10px',
                                            borderBottom: '2px solid #ddd',
                                            color: '#555',
                                        }}
                                    >
                                        Price
                                    </th>
                                    <th
                                        style={{
                                            textAlign: 'center',
                                            padding: '10px',
                                            borderBottom: '2px solid #ddd',
                                            color: '#555',
                                        }}
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurant?.menu.map((menuItem: MenuItem) => (
                                    <tr key={menuItem._id}>
                                        <td
                                            style={{
                                                padding: '10px',
                                                borderBottom: '1px solid #ddd',
                                                color: '#555',
                                            }}
                                        >
                                            {menuItem.name}
                                        </td>
                                        <td
                                            style={{
                                                padding: '10px',
                                                borderBottom: '1px solid #ddd',
                                                color: '#555',
                                            }}
                                        >
                                            ${menuItem.price.toFixed(2)}
                                        </td>
                                        {!handlingPayment && (
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '10px',
                                                    borderBottom: '1px solid #ddd',
                                                }}
                                            >
                                                <button
                                                    onClick={() => addToCart(menuItem)}
                                                    style={{
                                                        padding: '8px 12px',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        backgroundColor: '#007bff',
                                                        color: '#fff',
                                                        fontSize: '14px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Add to Cart
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <ShoppingCart orderItemList={menuItems} />
                    <a
                        onClick={handleProceedToPayment}
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            backgroundColor: '#007bff',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '10px 0',
                            display: 'inline-block',
                            border: '1px solid #007bff',
                            borderRadius: '8px',
                        }}
                    >
                        Proceed to Payment
                    </a>
                    <div>
                        {handlingPayment && (
                            <div
                                style={{
                                    marginTop: '20px',
                                    padding: '20px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#f9f9f9',
                                }}
                            >
                                <h1
                                    style={{
                                        color: '#333',
                                        fontSize: '24px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Total Price: ${totalPrice.toFixed(2)}
                                </h1>
                                <h3
                                    style={{
                                        color: '#555',
                                        fontSize: '18px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Card Number
                                </h3>
                                <input
                                    value={card}
                                    onChange={onCardChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        marginBottom: '20px',
                                    }}
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <button
                                        onClick={() => handlePayment()}
                                        style={{
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Pay
                                    </button>
                                    <button
                                        onClick={() => setHandlingPayment(false)}
                                        style={{
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h1>Order completed!</h1>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOrderComplete(false);
                        }}
                    >
                        Make new order
                    </Button>
                </>
            )}


        </div>
    );
}

export default RestaurantComponent;
