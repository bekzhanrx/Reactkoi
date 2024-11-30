import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/CheckoutPage.css';
import '../styles/Cart.css'
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import BannerCarusel from '../components/BannerCarusel';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const handleSubmit = () => {
    // Логика отправки заказа
    alert('Ваш заказ успешно оформлен!');
    localStorage.removeItem('cart'); // Очистить корзину после оформления
  };

  return (
    <div>
      <Header/>
      <NavigationBar/>
      <BannerCarusel/>
      <div className='checkout-page'>
        <div>
         <h1>Оформление заказа</h1>
        </div>
        <div className='cartcont'>
            <ul className='cards'>
            {cart.map(product => (
                <li key={product.id} className="cart-item">
                <img src={product.image} alt={product.name} className="cartt-item-image" />
                <div className='cart-info'>
                    <h2>{product.name}</h2>
                    <p>{product.price}₽</p>
                </div>
                </li>
            ))}
            </ul>
            <div className="cart-total">
             <h3>Итого: {totalPrice}₽</h3>
             <button onClick={handleSubmit} className="checkout-btn">Оформить заказ</button>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
