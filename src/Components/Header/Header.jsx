import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"

import './Header.scss';
import { Link } from 'react-router-dom';

export const Header = ({ setMenu }) =>{
  const { dataDB } = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <header className="header" style={{backgroundColor: `${dataDB.settings[0].clHeader}`}}>
        <div className="container container--header">
          <div className="header__top">
            <div onClick={() => setMenu(true)} className="header__icons header__menu"></div>

            <div className="header__title" style={{color: `${dataDB.settings[0].clTitle}`}}>
              {dataDB.listBot[0].name}
            </div>

            <Link to='/Cart' className="header__icons header__cart">
              {(dataDB.allCartCount > 0)? <span className='header__cart--count'>{dataDB.allCartCount}</span> :null}
            </Link>
          </div>
        </div>
      </header>
    </>
    }
  </>
}