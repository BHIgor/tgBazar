import '../Header/Header.scss';

export const Header = () =>{

  return <> 
    <header className="header" style={{backgroundColor: 'orange'}}>
      <div className="container container--header">
        <div className="header__top">
          <button className="header__menu">
            OK
          </button>

          <div className="header__search">
            <input className="header__search"/>
          </div>

          <button className="header__cart">
            OK
          </button>
        </div>
      </div>
    </header>
  </>
}