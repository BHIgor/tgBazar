import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"
import { NavLink } from 'react-router-dom';

import '../Menu/Menu.scss';


export const Menu = ({ 
  menu,
  setMenu
}) =>{
  const dataDB = useContext(ReactContext);

  const getLinkStyle = ({ isActive }) => ({backgroundColor: isActive ? `${dataDB.settings[0].clHeader}`: null}) 

  return <>
      { (dataDB.length === 0) ? <div>Помилка</div> : <>   
        <aside className={menu ? "menu page__menu active-menu" : 'menu page__menu'}>
          <div onClick={() => setMenu(false)}  className='menu__close'> </div>
          <div className='menu__title' style={{color:`${dataDB.settings[0].clHeader}`,backgroundColor: `${dataDB.settings[0].clTitle}`}}>
            {dataDB.listBot[0].name}
          </div>
          <div className="container menu__container">
              <ul className="menu__nav">
                <NavLink to={`/?${dataDB.listBot[0].nameShop}#back`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                  <li className="menu__item">
                    <div className='menu__icon menu__icon--main'></div>
                      <div className='menu__list' >
                        Головна
                      </div>
                  </li>
                </NavLink>
                
                <NavLink to={`/Compare?${dataDB.listBot[0].nameShop}`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                  <li className="menu__item">
                    <div className='menu__icon menu__icon--katalog'></div>
                    <div className="menu__list">
                      Каталог
                    </div>
                  </li>
                </NavLink>

                <hr className='menu__lineHorizont'></hr>

                <NavLink  to={`/Cart?${dataDB.listBot[0].nameShop}`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                  <li className="menu__item">
                    <div className='menu__icon menu__icon--cart'></div>
                    <div className="menu__list">
                      Кошик
                    </div>
                  </li>
                </NavLink>

                <NavLink to={`/Orders?${dataDB.listBot[0].nameShop}`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                  <li className="menu__item ">
                    <div className='menu__icon menu__icon--checkout'></div>
                    <div className="menu__list">
                      Мої замовлення
                    </div>
                  </li>
                </NavLink>

                { 
                  (dataDB.settings[0].contacts === '') ? null : (
                    <NavLink to={`/Contacts?${dataDB.listBot[0].nameShop}`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                      <li className="menu__item">
                        <div className='menu__icon menu__icon--contacts'></div>
                        <div className="menu__list">
                          Контакти
                        </div>
                      </li>
                    </NavLink>
                  )
                }
                { 
                  (dataDB.settings[0].help === '') ? null : (
                    <NavLink to={`/Help?${dataDB.listBot[0].nameShop}`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                      <li className="menu__item">
                        <div className='menu__icon menu__icon--help'></div>
                        <div className="menu__list">
                          Допомога
                        </div>
                      </li>
                    </NavLink>
                  )
                }

                <hr className='menu__lineHorizont'></hr>
                
                { 
                  (dataDB.settings[0].about === '') ? null : (
                    <NavLink to={`/About?${dataDB.listBot[0].nameShop}`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                      <li className="menu__item">
                        <div className='menu__icon menu__icon--about'></div>
                        <div className="menu__list">
                          Про нас
                        </div>
                      </li>
                    </NavLink>
                  )
                }
                
                { 
                  (dataDB.settings[0].garant === '') ? null : (
                    <NavLink to={`/Garant?${dataDB.listBot[0].nameShop}`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                      <li className="menu__item">
                        <div className='menu__icon menu__icon--garant'></div>
                        <div className="menu__list">
                          Гарантійні умови
                        </div>
                      </li>
                    </NavLink>
                  )
                }

                { 
                  (dataDB.settings[0].delivery === '') ? null : (
                    <NavLink to={`/Delivery?${dataDB.listBot[0].nameShop}`}onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                      <li className="menu__item">
                        <div className='menu__icon menu__icon--delivery'></div>
                        <div  className="menu__list">
                          Доставка
                        </div>
                      </li>
                    </NavLink>
                  )
                }
               
                { 
                  (dataDB.settings[0].pay === '') ? null : (
                    <NavLink to={`/Pay?${dataDB.listBot[0].nameShop}`} onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                      <li className="menu__item">
                        <div className='menu__icon menu__icon--pay'></div>
                        <div className="menu__list">
                          Оплата
                        </div>
                      </li>
                    </NavLink>
                  )
                }
                
                { 
                  (dataDB.settings[0].obmin === '') ? null : (
                    <NavLink to={`/Obmin?${dataDB.listBot[0].nameShop}`}onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                      <li className="menu__item ">
                        <div className='menu__icon menu__icon--obmin'></div>
                        <div className="menu__list">
                          Обмін і повернення
                        </div>
                      </li>
                    </NavLink>
                  )
                }

                { 
                  (dataDB.settings[0].grafik === '') ? null : (
                    <NavLink to={`/Grafik?${dataDB.listBot[0].nameShop}`}onClick={() => setMenu(false)} className='menu__link' style={getLinkStyle}>
                      <li className="menu__item">
                        <div className='menu__icon menu__icon--time'></div>
                        <div className="menu__list">
                          Графік роботи
                        </div>
                      </li>
                    </NavLink>
                  )
                }
              </ul>
          </div>       
        </aside>
      </>
    }
  </>
}
