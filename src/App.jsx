import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import './App.css';

import { Homepage } from './Components/Homepage/Homepage';

const tg = window.Telegram.WebApp;

function App() {
  const { shopName } = useParams();
  const [dataDB, setDataDB] = useState([]);

  useEffect(() => {
    tg.ready();
    fetch(`https://tgbazar.com.ua/products`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setDataDB(data);
    });
  }, [])

  const onClose = () => {
    tg.close();
  }

  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>} tg={tg} onClose={onClose} shopName={shopName} >
        </Route>
      </Routes>  
    </div>
  );
}

export default App;
