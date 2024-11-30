import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Загружаем корзину из localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Обновляем корзину в localStorage
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="cart">
      <div>
      <h1>Ваша корзина</h1>
      </div>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div className='cartcont'>
          <ul className='cards'>
            {cart.map(product => (
              <li key={product.id} className="cart-item">
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className='cart-info'>
                  <h2>{product.name}</h2>
                  <p>{product.price}₽</p>
                  <button onClick={() => handleRemoveFromCart(product.id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
             <h3>Итого: {totalPrice}₽</h3>
             <Link to="/checkout">
               <button className="checkout-btn">Перейти к оплате</button>
             </Link>
          </div>
        </div>
      )}
    </div>
  );
}
