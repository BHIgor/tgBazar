import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';

import './App.css';

import { Homepage } from './Components/Homepage/Homepage';
import { ReactContext } from './context/ReactContext';



function App() {
  const [dataDB, setDataDB] = useState([]);

  useEffect(() => {
    fetch(`https://tgbazar.com.ua/products`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setDataDB(data);
    });
  }, [])

  return (
    <div className="App">
      <ReactContext.Provider value={dataDB}>
        <Routes>
          <Route path='/' element={<Homepage/>}>
          </Route>
        </Routes>
      </ReactContext.Provider>
    </div>
  );
}

export default App;
