import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Cart.scss'
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';


export const Cart = () =>{
  const { dataDB, setDataDB} = useContext(ReactContext);

const fullPrice = (dataDB.cart) ? dataDB.cart.reduce((accumulator, currentValue) => {
  return accumulator + (((currentValue.price_discount === 0)? currentValue.price : currentValue.price_discount) * currentValue.count);
}, 0) : 0

  const removeProduct = (product) => {
    const copyData = { ...dataDB }

    copyData.allCartCount -= product.count
    const index = copyData.cart.findIndex(n => n.id === product.id);

    if (index !== -1) {
      copyData.cart.splice(index, 1);
    }

    setDataDB(copyData)
  }

  const scrollToTop = () => {
    scroll.scrollToTop({duration:20});
  };

  const plus = (product) => {
    const copyData = { ...dataDB }
    
    copyData.allCartCount += 1
    copyData.cart.forEach( e => (e.id === product.id) ? e.count++ : null)
 
    setDataDB(copyData)
  }

  const minus = (product) => {
    const copyData = { ...dataDB }
    
    if (product.count > 1){
      copyData.allCartCount -= 1 
    } 

    copyData.cart.forEach( e => (e.id === product.id && e.count > 1) ? e.count--  : null)
    
    setDataDB(copyData)
  }

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
        <div className='cart'>
          {
            (dataDB.cart.length > 0) ? <>
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
                  <Link 
                   to={`/Product/${e.id}?${dataDB.listBot[0].nameShop}`}   
                   onClick={() =>scrollToTop()} 
                   className="cart__title">
                    {e.title}
                  </Link>
    
                  <div className="cart__footer">
                    <div className="cart__price">
                      {((e.price_discount === 0)? e.price: e.price_discount) * e.count}<span className='cart__simvol'>₴</span>
                    </div>
    
                    <div className="cart__countProduct">
                      <div className="cart__buttonCount">
                        <div 
                          className="cart__button " 
                          onClick={() => minus(e)}
                          style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}>
                            –
                          </div>
    
                        <div className="cart__input">
                          {e.count}
                        </div>
                          
                        <div 
                          className="cart__button"
                          onClick={() => plus(e)}
                          style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}
                        >+</div>
                      </div>
                      <div className="cart__blockDelete" onClick={() => removeProduct(e)}>
                        <div className="cart__delete">
                        </div>
                      </div>  
                    </div>
                  </div>
                  
                </div>
              </div>
            )})}
            
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
    
                <Link to={`/Checkout?${dataDB.listBot[0].nameShop}`}  className="cart__orderButton" style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}>
                  Оформити замовлення
                </Link>
              </div>
    
            </div>
          </>: <>
          <div className="cart__empty">
            <div className="cart__empty--text">
              Кошик порожній
            </div>

            <div className='cart__empty--center'>
             <div className="cart__empty--icon"></div>
            </div>
            
          </div>
          
          </> 
        }
        
      </div>
    </>
    }
  </>
}