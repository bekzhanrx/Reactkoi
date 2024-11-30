import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import './App.css';
import { useEffect, useState } from 'react';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
    if (new Date(user.expiresAt) < new Date()) {
      setLoggedIn(false);
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path='/signup' element={<Register setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/products" element={<ProductsPage />} /> {/* Маршрут для ProductsPage */}
          <Route path="/products/:id" element={<ProductDetailPage/>} /> {/* Маршрут для продукта */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
