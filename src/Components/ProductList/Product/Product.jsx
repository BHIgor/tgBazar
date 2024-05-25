import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Product.scss';

export const Product = ({products}) =>{
  const dataDB = useContext(ReactContext);


  console.log(products)

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="product">
        <div className='product__block'>
          <div className='product__title--flex'>
            <div className="product__title--icon"></div>
            <div className='product__title'>Топ продаж</div>
          </div>
          <div className="product__container">
            {products.map(e => {
              return (
                <div key={e.id} className='product__page'>
                  <div className='product__page--imgBlock'>
                    <img 
                      src={e.image} 
                      alt='Нема фото' 
                      className='product__page--image'
                      />
                  </div>
                  
                  <div className='product__page--title'>
                    {e.title} паврав онраорп парап  о
                  </div>  

                </div>
              )
            })}
          </div> 
        </div> 
      </div>
    </>
    }
  </>
}