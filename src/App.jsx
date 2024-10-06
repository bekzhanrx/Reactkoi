import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Импортируем компонент главной страницы
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Header/>
      <NavigationBar/>
      {/* Маршрутизация */}
      <Routes>
        <Route path="/" element={<Home/>} /> {/* Главная страница */}
        {/* Вы можете добавить больше маршрутов для других страниц */}
      </Routes>
      <Footer/>
    </Router>
  );
}
