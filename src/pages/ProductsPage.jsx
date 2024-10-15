import React, { useEffect,useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import '../styles/ProductsPage.css';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import BannerCarusel from '../components/BannerCarusel';

export const productsData = [
    { id: 1, name: 'Витамин D', price: 1500, image: 'vitaminD.jpg', categoryId: 1 },
    { id: 2, name: 'Витамин B12', price: 800, image: 'vitaminB12.jpg', categoryId: 1 },
    { id: 3, name: 'Мультивитамины', price: 2000, image: 'multivitamins.jpg', categoryId: 1 },
    { id: 4, name: 'Омега-3', price: 1200, image: 'omega3.jpg', categoryId: 1 },
    { id: 5, name: 'Витамин C', price: 500, image: 'vitaminC.jpg', categoryId: 1 },
    { id: 6, name: 'Парацетамол', price: 3000, image: 'paracetamol.jpg', categoryId: 2 },
    { id: 7, name: 'Ибупрофен', price: 1800, image: 'ibuprofen.jpg', categoryId: 2 },
    { id: 8, name: 'Антигистаминные таблетки', price: 1500, image: 'antihistamines.jpg', categoryId: 2 },
    { id: 9, name: 'Мукалтин', price: 1200, image: 'loperamide.jpg', categoryId: 2 },
    { id: 10, name: 'Аспирин', price: 2500, image: 'aspirin.jpg', categoryId: 2 },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const handleSearch = (searchText) => {
    setSearchTerm(searchText); // Обновляем состояние поиска
  };

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

