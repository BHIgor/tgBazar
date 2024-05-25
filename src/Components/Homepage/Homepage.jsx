import { useContext } from "react"
import { ReactContext } from "../../context/ReactContext"
import { Link } from "react-router-dom";

import './Homepage.scss';

import { Slider } from "./Slider/Slider";
import { ProductList } from '../ProductList/ProductList'

const tg = window.Telegram.WebApp;

export const Homepage = () =>{
 const dataDB = useContext(ReactContext);
  tg.ready()

  const onClose = () => {
    tg.close();
  }
  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <main className="main">
        <div className="main__search"> 
            <div className="main__search--icon"></div>
            <input 
            className="main__search--input"
            placeholder="Введіть назву або id товару ..."
          />
        </div>

      <Slider/>

      <div className="main__center">
        <Link to='/Katalog'className="main__katalog">
          <div className="main__katalog--icon"></div>  
          <div  className="main__katalog--text">Каталог</div>
        </Link>
      </div>

      <ProductList />
      
      </main>
      
     
      </>
    }
  </>
}