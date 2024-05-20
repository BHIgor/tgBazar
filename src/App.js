import { useEffect, useState } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;

function App() {
  const [dataDB, setDataDB] = useState('');

  useEffect(() => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close();
  }

  fetch(`https://tgbazar.com.ua/products`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setDataDB(data.message);
      console.log(data.message);
      
    });
  return (
    <div className="App">
      word
        <button onClick={onClose}>Закрить</button>
        {tg.initDataUnsafe?.user?.username}
        {tg.initDataUnsafe?.user?.id}
        {dataDB}
    </div>
  );
}

export default App;
