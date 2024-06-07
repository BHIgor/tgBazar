import React,{ useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { Link, useParams } from 'react-router-dom';
import { Product } from '../../ProductList/Product/Product';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay } from 'swiper/modules';


export const Kategory = () =>{
  const { dataDB } = useContext(ReactContext);
  const allProducts = (dataDB.length === 0) ? [] :dataDB.products
  const { catageryName } = useParams();

  const visibleProduct = []

  allProducts.map(e => e.kategory === catageryName ? visibleProduct.push(e) : null)
  
  const uniqueCategories = new Set(allProducts.map(product => product.kategory));
  const uniquArray = Array.from(uniqueCategories);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="kategory">
        <div className="kategory__container">
            <Link to={`/Katalog?${dataDB.listBot[0].nameShop}`} className="kategory__back" style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}>
              Назад
            </Link>
          <div className="kategory__header">

            <div className="kategory__title">
              {catageryName}
            </div>
          </div>
          <Swiper
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={10}
          
            modules={[Autoplay]} 
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="kategory__slider"
          > 
            {
              uniquArray.map(e =>{
                return (
                  <SwiperSlide className='kategory__slider--item' key={e}  >
                    <Link 
                      to={`/Kategory/${e}?${dataDB.listBot[0].nameShop}`} className='kategory__slider--link'
                      style={{border: `1px solid ${dataDB.settings[0].clHeader}`}}
                    >
                      {e}
                    </Link>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>

          <div>
            <Product products = {visibleProduct}/>
          </div>
        </div>      
      </div>
     
    </>
    }
  </>
}