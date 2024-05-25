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
                    {e.title} 
                  </div>  
                  
                  {(e.nayavno === 'yes') ? (<>
                    <div className='product__page--nalRegion product__page--nalBlock'>
                      <div className='product__page--nayavno'></div>
                      <div className='product__page--nal'>
                        Є в наявності
                      </div>
                    </div></>
                  ): (<>
                    <div className='product__page--nalRegion product__page--noNalBlock'>
                      <div className='product__page--noNayavno'></div>
                      <div className='product__page--noNal'>
                        Немає в наявності
                      </div>
                    </div>
                  </>)}
                <div className='product__page--buy' >
                  <div className="product__page--buyBlock" style={{backgroundColor: 'orange'}}>
                    <div className="product__page--buyIcon"></div>
                  </div>
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