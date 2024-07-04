import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import Orders from './Components/Orders/Orders';
import ShopCollection from './Pages/ShopCollection';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Kid from './Pages/Kid';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<Men/>}/>
        <Route path='/mens/:category' element={<ShopCollection />} />
        <Route path='/womens' element={<Women/>}/>
        <Route path='/womens/:category' element={<ShopCollection />} />
        <Route path='/kids' element={<Kid/>}/>
        <Route path='/kids/:category' element={<ShopCollection />} />
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
