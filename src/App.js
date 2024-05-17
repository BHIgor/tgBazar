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
  let data;

  fetch(`https://glazatelega.xyz/bazar`)
    .then( response => response.json() )
    .then( data => console.log(data) )

  return (
    <div className="App">
      word
        <button onClick={onClose}>Закрить</button>
        {tg.initDataUnsafe?.user?.username}
        {tg.initDataUnsafe?.user?.id}
        {data}
    </div>
  );
}

export default App;
