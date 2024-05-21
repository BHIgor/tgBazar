import '../Header/Header.scss';

export const Header = () =>{

  return <> 
    <header className="header">
      <div className="container container--header">
        <div className="header__top">
          <button className="header__logo">
            OK
          </button>

          <div className="header__search">
            <input className="header__icons header__icons--menu"/>
          </div>

          <div className="header__cart">
            ake the Streets
          </div>
        </div>
      </div>
    </header>
  </>
}