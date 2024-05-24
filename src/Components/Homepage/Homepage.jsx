import { useContext } from "react"
import { ReactContext } from "../../context/ReactContext"

import './Homepage.scss';

import { Slider } from "./Slider/Slider";
import { Link } from "react-router-dom";

const tg = window.Telegram.WebApp;

export const Homepage = () =>{
 const dataDB = useContext(ReactContext);
  tg.ready()

  const onClose = () => {
    tg.close();
  }
  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="main">
        <div className="main__search"> 
            <div className="main__search--icon"></div>
            <input 
            className="main__search--input"
            placeholder="Введіть назву або id товару ..."
          />
        </div>

      <Slider/>

      <Link to='/Katalog' className="main__center">
        <div className="main__katalog">
          <div className="main__katalog--icon"></div>  
          <div  className="main__katalog--text">Каталог</div>
        </div>
      </Link>
      

         

<button onClick={onClose}>Закрить</button>
{tg.initDataUnsafe?.user?.username}
{tg.initDataUnsafe?.user?.id}

{
  dataDB.products.map(e => {
    return (
      <div key={e.id} className="test">
        {e.name}
      </div>
    )
  }) 
}
      </div>
      
     
      </>
    }
  </>
}