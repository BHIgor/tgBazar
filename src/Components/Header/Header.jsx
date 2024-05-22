import '../Header/Header.scss';

import cart from '../../images/cart.png'
import menu from '../../images/burger.png'

export const Header = () =>{

  return <> 
    <header className="header" style={{backgroundColor: 'orange'}}>
      <div className="container container--header">
        <div className="header__top">
          <a href='#menu' className="header__menu">
            <img 
                src={menu}
                alt="menu"
                className="header__menu--img"
              />
          </a>

          <div className="header__title" style={{color: 'dimgray'}}>
            Мобилка
          </div>

          <a href='#cart' className="header__cart">
            <img 
              src={cart}
              alt="cart"
              className="header__cart--img"
            />
          </a>
        </div>
      </div>
    </header>
  </>
}