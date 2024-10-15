import React from 'react';
import ProductItem from './ProductItem';
import '../styles/ProductList.css';

export default function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => <ProductItem key={product.id} product={product} />)
      ) : (
        <p>Товары не найдены</p>
      )}
    </div>
  );
}
