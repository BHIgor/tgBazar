import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"

import '../Header/Header.scss';

export const Header = () =>{
  const dataDB = useContext(ReactContext);
  console.log(dataDB.listBot)

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <header className="header" style={{backgroundColor: `${dataDB.settings[0].clHeader}`}}>
        <div className="container container--header">
          <div className="header__top">
            <a href='#menu' className="header__icons header__menu">
              
            </a>

            <div className="header__title" style={{color: `${dataDB.settings[0].clTitle}`}}>
              {dataDB.listBot[0].name}
            </div>

            <a href='#cart' className="header__icons header__cart">
            
            </a>
          </div>
        </div>
      </header>
    </>
    }
  </>
}