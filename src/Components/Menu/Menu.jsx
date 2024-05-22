import '../Menu/Menu.scss';

export const Menu = () =>{

  return <>   
    <aside className="menu page__menu" id="menu">
      <div className="container menu__container">
        <ul class="menu__nav">
          <li class="menu__item">
            <a href="#" class="menu__list">
              Home
            </a>
          </li>

          <li class="menu__item">
            <a href="#About" class="menu__list">
              About Us
            </a>
          </li>

          <li class="menu__item">
            <a href="#Compare" class="menu__list">
              Compare Bikes
            </a>
          </li>

          <li class="menu__item">
            <a href="#Details" class="menu__list">
              Details
            </a>
          </li>

          <li class="menu__item">
            <a href="#Contact" class="menu__list">
              Contacts
            </a>
          </li>
        </ul>
        <div class="menu__footer">
          <a href="tel:+1 234 5555-55-55" class="menu__list--link">
            +1 234 5555-55-55
          </a>

          <a href="#" class="menu__list--link">
            Book a test ride
          </a>
        </div>
      </div>
      <a href='#' className='menu__close'>

      </a>
    </aside>
  </>
}
