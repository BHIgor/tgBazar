import { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close();
  }
  let content = '';

  fetch(`https://tgbazar.com.ua/products`)
    .then( response => response.json() )
    .then( data => console.log(data) )

  return (
    <div className="App">
      word
        <button onClick={onClose}>Закрить</button>
        {tg.initDataUnsafe?.user?.username}
        {tg.initDataUnsafe?.user?.id}
        {content}
    </div>
  );
}

export default App;
