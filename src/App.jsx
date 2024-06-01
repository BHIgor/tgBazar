import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import { ReactContext } from './context/ReactContext';

import './App.scss';

import { Homepage } from './Components/Homepage/Homepage';
import { Header } from './Components/Header/Header';
import { Menu } from './Components/Menu/Menu';
import { About } from './Components/Menu/About/About'
import { Cart } from './Components/Menu/Cart/Cart'
import { Contacts } from './Components/Menu/Contacts/Contacts'
import { Delivery } from './Components/Menu/Delivery/Delivery'
import { Garant } from './Components/Menu/Garant/Garant'
import { Grafik } from './Components/Menu/Grafik/Grafik'
import { Help } from './Components/Menu/Help/Help'
import { Katalog } from './Components/Menu/Katalog/Katalog'
import { Obmin } from './Components/Menu/Obmin/Obmin'
import { Orders } from './Components/Menu/Orders/Orders'
import { Pay } from './Components/Menu/Pay/Pay'
import { Footer } from './Components/Footer/Footer';
import { FooterLine } from './Components/FooterLine/FooterLine';
import { Like } from './Components/Menu/Like/Like';
import { ProductPage } from './Components/ProductList/ProductPage/ProductPage';

const search = window.location.search

function App() {
  const [dataDB, setDataDB] = useState([]);
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try{
      fetch(`https://tgbazar.com.ua/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({nameShop: search.substring(1)})
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDataDB(data);
      });
    } catch (e) {
      return false;
    }
  }, [])
  
  const backButton = window.Telegram.WebApp.BackButton;;

  if(window.location.hash.includes('#/?')){
    backButton.hide();
  } else {
    backButton.show()
  }

  backButton.onClick(() => {
    navigate(-1);
  });

  console.log(dataDB)

  return (
    <div className="app">
      <ReactContext.Provider value={{ dataDB, setDataDB }}>
       <div className='footerTop'>
        <Header setMenu={setMenu}/>
        <Menu setMenu={setMenu} menu={menu}/>
  
          <Routes>      
            <Route path='/' exact element={<Homepage/>}/>
            <Route path="/Product/:productId" element={<ProductPage />} />
            <Route path='/About' element={<About/>}/>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Contacts' element={<Contacts/>}/>
            <Route path='/Delivery' element={<Delivery/>}/>
            <Route path='/Garant' element={<Garant/>}/>
            <Route path='/Grafik' element={<Grafik/>}/>
            <Route path='/Help' element={<Help/>}/>
            <Route path='/Katalog' element={<Katalog/>}/>
            <Route path='/Like' element={<Like/>}/>
            <Route path='/Obmin' element={<Obmin/>}/>
            <Route path='/Orders' element={<Orders/>}/>
            <Route path='/Pay' element={<Pay/>}/>
          </Routes>
          <Footer />
        </div>
        <FooterLine setMenu={setMenu}/>
      
        
      </ReactContext.Provider>
    </div>
  );
}

export default App;
