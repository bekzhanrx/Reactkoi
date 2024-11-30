import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import '../styles/ProductItem.css';

export default function ProductItem({ product }) {
  const navigate = useNavigate(); // Инициализация хука навигации

  const handleClick = () => {
    navigate(`/products/${product.id}`); // Переход на страницу продукта по его id
  };

  return (
    <div className="product-item" onClick={handleClick}> {/* Добавляем обработчик клика */}
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}₽</p>
    </div>
  );
}


