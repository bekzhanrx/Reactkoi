import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { productsData } from '../pages/ProductsPage';
import '../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));

  const [added, setAdded] = useState(false); // Состояние для отслеживания добавления в корзину

  // Функция для добавления в корзину
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Получаем корзину из localStorage или создаем новую
    const productExists = cart.find(item => item.id === product.id);

    if (!productExists) {
      cart.push(product); // Добавляем продукт в корзину, если его нет
      localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
      setAdded(true); // Обновляем состояние, чтобы показать, что продукт добавлен
    }
  };

  if (!product) {
    return <p>Продукт не найден</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p className="price">{product.price}₽</p>
      <p>{product.description}</p>

      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={added} // Блокируем кнопку, если товар уже в корзине
      >
        {added ? 'Добавлено в корзину' : 'Добавить в корзину'}
      </button>
    </div>
  );
}

