import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import '../styles/ProductsPage.css';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import BannerCarusel from '../components/BannerCarusel';
import { setSearchTerm } from '../store'; // Импортируем действие

export const productsData = [
  { 
      id: 1, 
      name: 'Витамин D', 
      price: 1500, 
      image: '/vitaminD.jpg', 
      categoryId: 1, 
      description: 'Витамин D помогает поддерживать здоровье костей и иммунной системы, способствуя усвоению кальция и фосфора.' 
  },
  { 
      id: 2, 
      name: 'Витамин B12', 
      price: 800, 
      image: '/vitaminB12.jpg', 
      categoryId: 1, 
      description: 'Витамин B12 поддерживает здоровье нервной системы и участвует в производстве эритроцитов.' 
  },
  { 
      id: 3, 
      name: 'Мультивитамины', 
      price: 2000, 
      image: '/multivitamins.jpg', 
      categoryId: 1, 
      description: 'Комплекс витаминов и минералов для поддержки общего здоровья и иммунитета.' 
  },
  { 
      id: 4, 
      name: 'Омега-3', 
      price: 1200, 
      image: '/omega3.jpg', 
      categoryId: 1, 
      description: 'Омега-3 жирные кислоты поддерживают здоровье сердца, мозга и суставов.' 
  },
  { 
      id: 5, 
      name: 'Витамин C', 
      price: 500, 
      image: '/vitaminC.jpg', 
      categoryId: 1, 
      description: 'Антиоксидант, который укрепляет иммунитет и помогает организму справляться со стрессом.' 
  },
  { 
      id: 6, 
      name: 'Парацетамол', 
      price: 3000, 
      image: '/paracetamol.jpg', 
      categoryId: 2, 
      description: 'Обезболивающее и жаропонижающее средство для снятия симптомов головной боли, лихорадки и болей.' 
  },
  { 
      id: 7, 
      name: 'Ибупрофен', 
      price: 1800, 
      image: '/ibuprofen.jpg', 
      categoryId: 2, 
      description: 'Эффективное средство для снятия воспаления, боли и лихорадки.' 
  },
  { 
      id: 8, 
      name: 'Антигистамин', 
      price: 1500, 
      image: '/antihistamines.jpg', 
      categoryId: 2, 
      description: 'Лекарство для облегчения симптомов аллергии, таких как зуд, чихание и сыпь.' 
  },
  { 
      id: 9, 
      name: 'Мукалтин', 
      price: 1200, 
      image: '/loperamide.jpg', 
      categoryId: 2, 
      description: 'Препарат на растительной основе для облегчения кашля и выведения мокроты.' 
  },
  { 
      id: 10, 
      name: 'Аспирин', 
      price: 2500, 
      image: '/aspirin.jpg', 
      categoryId: 2, 
      description: 'Снижает воспаление, боль и предотвращает образование тромбов.' 
  },
];


export default function ProductsPage() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector(state => state.search); // Получаем поисковый запрос из Redux
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Обработчик поиска, который будет обновлять состояние в Redux
  const handleSearch = (searchText) => {
    dispatch(setSearchTerm(searchText)); // Обновляем поисковый запрос в Redux
  };

  // Фильтрация продуктов с использованием поискового запроса и категории
  const filteredProducts = useMemo(() => {
    const filteredByCategory = categoryParam 
      ? productsData.filter(product => product.categoryId === parseInt(categoryParam)) 
      : productsData;

    return filteredByCategory.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categoryParam]);

  return (
    <div>
      <Header />
      <NavigationBar onSearch={handleSearch} /> {/* Передаем функцию */}
      <BannerCarusel />
      <div className="products-page">
        <h1>Продукты</h1>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
