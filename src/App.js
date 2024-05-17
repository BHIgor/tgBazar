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

  return (
    <div className="App">
      word
        <button onClick={onClose}>Закрить</button>
        {tg.initData}
    </div>
  );
}

export default App;
