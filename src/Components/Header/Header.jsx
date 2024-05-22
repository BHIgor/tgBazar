import '../Header/Header.scss';

export const Header = () =>{

  return <> 
    <header className="header" style={{backgroundColor: 'orange'}}>
      <div className="container container--header">
        <div className="header__top">
          <a href='#menu' className="header__icons header__menu">
          
          </a>

          <div className="header__title" style={{color: 'black'}}>
            Мобилка
          </div>

          <a href='#cart' className="header__icons header__cart">
           
          </a>
        </div>
      </div>
    </header>
  </>
}