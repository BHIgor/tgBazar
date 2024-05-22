import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"

import '../Menu/Menu.scss';

export const Menu = () =>{
  const dataDB = useContext(ReactContext);

  return <>
      { (dataDB.length === 0) ? <div>Помилка</div> : <>   
        <aside className="menu page__menu" id="menu" >
          <a href='#back' className='menu__close'> </a>
          <div className='menu__title' style={{color:'orange',backgroundColor: 'black'}}>
            {dataDB.listBot[0].name}
          </div>
          <div className="container menu__container">
              <ul className="menu__nav">
                <li className="menu__item">
                  <div className='menu__icon menu__icon--main'></div>
                  <a href="#About" className="menu__list">
                    Головна
                  </a>
                </li>
                <li className="menu__item">
                  <div className='menu__icon menu__icon--katalog'></div>
                  <a href="#Compare" className="menu__list">
                    Каталог
                  </a>
                </li>
                <hr className='menu__lineHorizont'></hr>
                <li className="menu__item">
                  <div className='menu__icon menu__icon--cart'></div>
                  <a href="#Details" className="menu__list">
                    Кошик
                  </a>
                </li>

                <li className="menu__item">
                  <div className='menu__icon menu__icon--checkout'></div>
                  <a href="#Contact" className="menu__list">
                    Мої замовлення
                  </a>
                </li>

                <li className="menu__item">
                  <div className='menu__icon menu__icon--contacts'></div>
                  <a href="#Contact" className="menu__list">
                    Контакти
                  </a>
                </li>
                
                <li className="menu__item">
                  <div className='menu__icon menu__icon--help'></div>
                  <a href="#Contact" className="menu__list">
                    Допомога
                  </a>
                </li>

                <hr className='menu__lineHorizont'></hr>
                
                <li className="menu__item">
                  <div className='menu__icon menu__icon--about'></div>
                  <a href="#Contact" className="menu__list">
                    Про нас
                  </a>
                </li>

                <li className="menu__item">
                  <div className='menu__icon menu__icon--garant'></div>
                  <a href="#Contact" className="menu__list">
                    Гарантійні умови
                  </a>
                </li>

                <li className="menu__item">
                  <div className='menu__icon menu__icon--delivery'></div>
                  <a href="#Contact" className="menu__list">
                    Доставка
                  </a>
                </li>

                <li className="menu__item">
                  <div className='menu__icon menu__icon--pay'></div>
                  <a href="#Contact" className="menu__list">
                    Оплата
                  </a>
                </li>

                <li className="menu__item">
                  <div className='menu__icon menu__icon--obmin'></div>
                  <a href="#Contact" className="menu__list">
                    Обмін і повернення
                  </a>
                </li>

                <li className="menu__item">
                  <div className='menu__icon menu__icon--time'></div>
                  <a href="#Contact" className="menu__list">
                    Графік роботи
                  </a>
                </li>
              </ul>
          </div>       
        </aside>
      </>
    }
  </>
}
