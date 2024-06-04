import { useContext, useState } from 'react';
import { ReactContext } from '../../../../context/ReactContext';

import './Checkout.scss'

export const Checkout = () =>{
  const { dataDB } = useContext(ReactContext);
  const [ status, setStatus ] = useState('contact')
  const [ user, setUser ] = useState({fio: '', phone: ''})

  
  const fullPrice = (dataDB.cart) ? dataDB.cart.reduce((accumulator, currentValue) => {
   return accumulator + (((currentValue.price_discount === 0)? currentValue.price : currentValue.price_discount) * currentValue.count);
  }, 0) : 0

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
          <div className="checkout__body">
            {(status === 'contact') ? <>
              <div className="checkout__contact">
                <div className="checkout__contact--title">
                  Ваші дані
                </div>
                <input 
                  className="checkout__contact--input" 
                  placeholder={`Прізвище, ім'я, по батькові *`}
                  onChange={(event) => setUser(prevstate => ({
                    ...prevstate,
                    fio: event.target.value
                  }))}
                  required  
                />
                <input 
                  className="checkout__contact--input" 
                  placeholder={`Ваш номер телефону *`}
                  onChange={(event) => setUser(prevstate => ({
                    ...prevstate,
                    phone: event.target.value
                  }))}
                  type="number" 
                  required  
                />
              
                <button  
                  className="checkout__contact--next" 
                  style={{backgroundColor: `${dataDB.settings[0].clHeader}`}}
                  onClick={() => setStatus('dostavka')}
                  disabled={(user.fio === '' || user.phone === '')? true:false}
                  >
                  Далі
                </button >
              </div>
            </>:null} 

            {(status === 'dostavka') ? <>
              <div className="checkout__dostavka">
                <div className="checkout__dostavka--title">
                  Доставка
                </div>
              
              </div>
            </>:null} 

            {(status === 'oplata') ? <>
              <div className="checkout__oplata">
                <div className="checkout__oplata--title">
                  Оплата
                </div>
              
              </div>
            </>:null} 
          </div>
           <div className="cart__orderBlock">
            <div className="cart__order"  style={{backgroundColor: `${dataDB.settings[0].clHeader}`}}></div> 
  
            <div className="cart__fullPrice">
              <div className="cart__blockPrice">
                <div className="cart__fullPrice--text">
                  Разом:
                </div>
                <div className="cart__fullPrice--price">
                  {fullPrice}<span className='cart__simvol'>₴</span>
                </div>
              </div>
  
              <div to={`/Checkout?${dataDB.listBot[0].nameShop}`}  className="cart__orderButton checkout__enter" style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}>
                Замовлення підтверджую
              </div>
            </div>
  
           </div>      
        </div>
      </div>
    </>
    }
  </>
}