import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import './App.css';

import { Homepage } from './Components/Homepage/Homepage';
import { ReactContext } from './context/reactContext';

const tg = window.Telegram.WebApp;

function App() {
  const { shopName } = useParams();
  const [dataDB, setDataDB] = useState([]);

  useEffect(() => {
    tg.ready()
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
      <ReactContext.Provider value={tg}>
        <Routes>
          <Route path='/' element={<Homepage/>} onClose={onClose} shopName={shopName} >
          </Route>
        </Routes>
      </ReactContext.Provider>
    </div>
  );
}

export default App;
