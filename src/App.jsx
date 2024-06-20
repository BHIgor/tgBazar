import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ReactContext } from './context/ReactContext';

import './App.scss';

import { Homepage } from './Components/Homepage/Homepage';
import { Header } from './Components/Header/Header';
import { Menu } from './Components/Menu/Menu';
import { About } from './Components/Menu/About/About'
import { Cart } from './Components/Menu/Cart/Cart'
import { Contacts } from './Components/Menu/Contacts/Contacts'
import { Garant } from './Components/Menu/Garant/Garant'
import { Grafik } from './Components/Menu/Grafik/Grafik'
import { Help } from './Components/Menu/Help/Help'
import { Katalog } from './Components/Menu/Katalog/Katalog'
import { Obmin } from './Components/Menu/Obmin/Obmin'
import { Orders } from './Components/Menu/Orders/Orders'
import { OrdersPage } from './Components/Menu/Orders/OrdersPage'
import { Footer } from './Components/Footer/Footer';
import { FooterLine } from './Components/FooterLine/FooterLine';
import { Like } from './Components/Menu/Like/Like';
import { ProductPage } from './Components/ProductList/ProductPage/ProductPage';
import { Checkout } from './Components/Menu/Cart/Checkout/Checkout';
import { DeliveryMenu } from './Components/Menu/Delivery/DeliveryMenu';
import { PayMenu } from './Components/Menu/Pay/PayMenu';
import { Kategory } from './Components/Menu/Katalog/Kategory';
import { SearchResult } from './Components/Homepage/SearchResult/SearchResult';
import { NoTarif } from './Components/Homepage/NoTarif/NoTarif';

const search = window.location.search
const tg = window.Telegram.WebApp;

function App() {
  const [dataDB, setDataDB] = useState([]);
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`https://tgbazar.com.ua/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ nameShop: search.substring(1), idUser: tg?.initDataUnsafe?.user?.id })
      })//tg?.initDataUnsafe?.user?.id
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

  if (window.location.hash.includes('#/?')) {
    backButton.hide();
  } else {
    backButton.show()
  }

  backButton.onClick(() => {
    navigate(-1);
  });

  console.log(dataDB)
  let idAdmin
  let activShop
  if(dataDB.length !== 0){
    idAdmin = dataDB?.listBot[0]?.idAdmin
  
    activShop = dataDB?.admins?.filter(e => e.idUser === idAdmin)
  }

  return  <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
    <div className="app">
      <ReactContext.Provider value={{ dataDB, setDataDB }}>
        
          {
            (activShop[0]?.activ === 'no') ? <>
               <NoTarif/>
            </> :
              <>
                <div className='footerTop' style={menu ? { overflowY: 'hidden' } : null}>
                <Header setMenu={setMenu} />
                <Menu setMenu={setMenu} menu={menu} />

                <Routes>
                  <Route path='/' exact element={<Homepage />} />
                  <Route path="/Product/:productId" element={<ProductPage />} />
                  <Route path="/OrderPage/:orderId" element={<OrdersPage />} />
                  <Route path="/Kategory/:catageryName" element={<Kategory />} />
                  <Route path='/SearchResult' element={<SearchResult />} />
                  <Route path='/About' element={<About />} />
                  <Route path='/Cart' element={<Cart />} />
                  <Route path='/Contacts' element={<Contacts />} />
                  <Route path='/Delivery' element={<DeliveryMenu />} />
                  <Route path='/Garant' element={<Garant />} />
                  <Route path='/Grafik' element={<Grafik />} />
                  <Route path='/Help' element={<Help />} />
                  <Route path='/Katalog' element={<Katalog />} />
                  <Route path='/Like' element={<Like />} />
                  <Route path='/Obmin' element={<Obmin />} />
                  <Route path='/Orders' element={<Orders />} />
                  <Route path='/Pay' element={<PayMenu />} />
                  <Route path='/Checkout' element={<Checkout />} />
                </Routes>
              </div>
          <Footer />
          <FooterLine setMenu={setMenu} />

        </>
        }


      </ReactContext.Provider>
    </div>
    
    </>
    }
  </>
}
export default App;
