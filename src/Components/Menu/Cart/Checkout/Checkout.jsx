import { useContext, useState } from 'react';
import { ReactContext } from '../../../../context/ReactContext';

import './Checkout.scss'

export const Checkout = () =>{
  const { dataDB } = useContext(ReactContext);
  const [ status ] = useState('dostavka')

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div id={'top'} className="checkout">
        <div className="checkout__container">
          <div className="checkout__title">
            Оформлення замовлення
          </div>
          <div className="checkout__icons">
            <div className={(status === 'contact') ? "checkout__icons--contactsActiv" : "checkout__icons--contacts"}></div>
            <hr className="checkout__icons--line"></hr>
            <div className={(status === 'dostavka') ? "checkout__icons--dostavkaActiv" : "checkout__icons--dostavka"}></div>
            <hr className="checkout__icons--line"></hr>
            <div className={(status === 'oplata') ? "checkout__icons--oplataActiv" : "checkout__icons--oplata"}></div>  
          </div>       
        </div>
      </div>
    </>
    }
  </>
}