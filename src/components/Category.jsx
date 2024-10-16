// components/Category.jsx
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Category.css';
import withRenderLogging from './withRenderLogging';

function Category() {
  const categories = useMemo(() => [
    { id: 1, name: 'Витамины и БАДы', image: 'vitamins.jpg' },
    { id: 2, name: 'Лекарства', image: 'medicine.jpg' },
    { id: 3, name: 'Косметика', image: 'cosmetics.jpg' },
    { id: 4, name: 'Детские товары', image: 'baby_products.jpg' },
    { id: 5, name: 'Гигиена', image: 'hygiene.jpg' },
    { id: 6, name: 'Медицинская техника', image: 'medical_tech.jpg' },
    { id: 7, name: 'Ортопедия', image: 'orthopedics.jpg' },
    { id: 8, name: 'Средства для похудения', image: 'weight_loss.jpg' },
    { id: 9, name: 'Товары для аллергиков', image: 'allergy.jpg' },
    { id: 10, name: 'Фитнес и спорт', image: 'fitness.jpg' }
  ], []);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="categories-section">
      <h2 className="categories-title">Категории</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <h3 className="category-name">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// Оборачиваем компонент HOC-ом
export default withRenderLogging(Category);


