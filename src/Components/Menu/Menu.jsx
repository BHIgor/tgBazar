//import { useContext } from 'react';
//import { ReactContext } from "../../context/ReactContext"

import '../Menu/Menu.scss';

export const Menu = () =>{
  //const dataDB = useContext(ReactContext);

  return <>   
    <aside className="menu page__menu" id="menu" style={{backgroundColor: '#e9e9e9'}}>
        <div className='menu__title' style={{color:'orange'}}>
        
        </div>
        <div className="container menu__container">
        <ul className="menu__nav">
          <li className="menu__item">
          </li>

          <li className="menu__item">
            <a href="#About" className="menu__list">
              About Us
            </a>
          </li>

          <li className="menu__item">
            <a href="#Compare" className="menu__list">
              Compare Bikes
            </a>
          </li>

          <li className="menu__item">
            <a href="#Details" className="menu__list">
              Details
            </a>
          </li>

          <li className="menu__item">
            <a href="#Contact" className="menu__list">
              Contacts
            </a>
          </li>
        </ul>
        <div className="menu__footer">
          <a href="tel:+1 234 5555-55-55" className="menu__list--link">
            +1 234 5555-55-55
          </a>


        </div>
      </div>
  
      <a href='#back' className='menu__close'> </a>
    </aside>
  </>
}
