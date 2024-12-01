import { createSlice, configureStore } from '@reduxjs/toolkit';

// Создаем slice для хранения поискового запроса
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: ''
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }
});

// Создаем slice для корзины
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
    },
    reducers: {
      addToCart: (state, action) => {
        state.items.push(action.payload);
      },
      removeFromCart: (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload.id);
      },
      clearCart: (state) => {
        state.items = [];
      },
      loadCart: (state, action) => {
        state.items = action.payload;
      },
    },
  });

  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      usernameError: '',
      emailError: '',
      passwordError: '',
    },
    reducers: {
      setUsernameError: (state, action) => {
        state.usernameError = action.payload;
      },
      setEmailError: (state, action) => {
        state.emailError = action.payload;
      },
      setPasswordError: (state, action) => {
        state.passwordError = action.payload;
      },
      clearErrors: (state) => {
        state.usernameError = '';
        state.emailError = '';
        state.passwordError = '';
      },
    },
  });
export const {
  setUsernameError,
  setEmailError,
  setPasswordError,
  clearErrors,
} = authSlice.actions;
export const { setSearchTerm } = searchSlice.actions;
export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;

// Конфигурируем store
const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  }
});

export default store;
