import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Cart.scss'

export const Cart = () =>{
  const { dataDB } = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className='cart'>
          {dataDB.cart.map(e => {
            const images = e.image.split(',')
           return(
            <div className='cart__product' key={e.id}>
              <div className="cart__BlockImage">
                <img
                  className='cart__image'
                  src={images[0]}
                  alt='Фото товару'
                />
              </div>
              <div className='cart__info'>
                <div className="cart__title">
                  {e.title}
                </div>
                <div className="cart__countProduct">
                  <div className="cart__buttonCount">
                    <div 
                      className="cart__button " 
                      style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}>
                        –
                      </div>
                    <input 
                      type="text" 
                      defaultValue='1'
                      className="cart__input" 
                       />
                    <div 
                      className="cart__button"
                      style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}
                    >+</div>
                  </div>
                  <div className="cart__blockDelete">
                    <div className="cart__delete">
                    </div>
                  </div>  
                </div>
              </div>
            </div>
          )})}
          
      </div>
    </>
    }
  </>
}