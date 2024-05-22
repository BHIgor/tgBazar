import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"

import '../Menu/Menu.scss';

export const Menu = () =>{
  const dataDB = useContext(ReactContext);

  return <>
      { (dataDB.length === 0) ? <div>Помилка</div> : <>   
        <aside className="menu page__menu" id="menu" >
            <div className='menu__title' style={{color:'orange',backgroundColor: 'black'}}>
              {dataDB.listBot[0].name}
            </div>
            <div className="container menu__container">
              <ul className="menu__nav">
                <li className="menu__item">
                  <a href="#About" className="menu__list">
                    Головна
                  </a>
                </li>

                <li className="menu__item">
                  <a href="#Compare" className="menu__list">
                    Каталог
                  </a>
                </li>

                <li className="menu__item">
                  <a href="#Details" className="menu__list">
                    Кошик
                  </a>
                </li>

                <li className="menu__item">
                  <a href="#Contact" className="menu__list">
                    Мої замовлення
                  </a>
                </li>
              </ul>
            <div className="menu__footer">
              <a href="tel:+1 234 5555-55-55" className="menu__list--link">
                Про нас
              </a>
              <a href="tel:+1 234 5555-55-55" className="menu__list--link">
                Контакти
              </a>
              <a href="tel:+1 234 5555-55-55" className="menu__list--link">
                Доставка
              </a>
              <a href="tel:+1 234 5555-55-55" className="menu__list--link">
                Оплата
              </a>
              <a href="tel:+1 234 5555-55-55" className="menu__list--link">
                Обмін і повернення
              </a>
              <a href="tel:+1 234 5555-55-55" className="menu__list--link">
                Гарантійні умови
              </a>
            </div>
          </div>
      
          <a href='#back' className='menu__close'> </a>
        </aside>
      </>
    }
  </>
}
