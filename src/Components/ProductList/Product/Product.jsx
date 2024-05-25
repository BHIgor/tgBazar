import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Product.scss';

export const Product = ({products}) =>{
  const dataDB = useContext(ReactContext);


  console.log(products)

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="product">
        <div className='s'>
        <div className='product__title'>Топ продажу</div>
        <div className="product__container">
          {products.map(e => {
            return (
              <div key={e.id} className='product__page'>
                <img 
                  src={e.image} 
                  alt='photo_product' 
                  className='product__image'
                  />

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