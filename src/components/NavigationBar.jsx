import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import '../styles/NavigationBar.css';

export default function NavigationBar() {
  const [searchText, setSearchText] = useState(''); // состояние для текста поиска
  const navigate = useNavigate(); // Хук для выполнения навигации

  const handleInputChange = (e) => {
    setSearchText(e.target.value); // обновляем состояние при изменении инпута
  };

  const handleSearch = () => {
    console.log("Поиск по запросу:", searchText); // выполняем действие при нажатии кнопки
  };

  // Оптимизация функции для клика по логотипу
  const handleLogoClick = useCallback(() => {
    navigate('/'); // Переход на главную страницу
  }, [navigate]); // Функция изменяется, если изменится navigate

  return (
    <nav className="navigation-bar">
      {/* Логотип */}
      <div className="logo" onClick={handleLogoClick}>
        <img src="diaz.jpeg" alt="Логотип" />
      </div>

      {/* Поле для поиска с кнопкой */}
      <div className="search-container">
        <img className="search" src="search.png" alt="Поиск" />
        <input
          type="text"
          placeholder="Поиск товаров..."
          className="search-input"
          value={searchText}
          onChange={handleInputChange} // обработчик изменения текста
        />
        <button className="search-button" onClick={handleSearch}>
          Найти
        </button>
      </div>

      {/* Иконки для избранного и корзины */}
      <div className="nav-icons">
        <div className="icon fav-icon">
          <img src="isb.png" alt="Избранное" />
          <p>Избранное</p>
        </div>
        <div className="icon cart-icon">
          <img src="corsina.png" alt="Корзина" />
          <p>Корзина</p>
        </div>
      </div>
    </nav>
  );
}

