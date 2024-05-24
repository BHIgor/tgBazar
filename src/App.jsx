import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import { ReactContext } from './context/ReactContext';

import './App.scss';

import { Homepage } from './Components/Homepage/Homepage';
import { Header } from './Components/Header/Header';
import { Menu } from './Components/Menu/Menu';

const search = window.location.search

function App() {
  const [dataDB, setDataDB] = useState([]);
  const [menu, setMenu] = useState(false)
  console.log(menu)
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

  return (
    <div className="app">
      <ReactContext.Provider value={dataDB}>
        <Header setMenu={setMenu}/>
        <Menu setMenu={setMenu} menu={menu}/>
        <Routes> 
          
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </ReactContext.Provider>
    </div>
  );
}

export default App;
