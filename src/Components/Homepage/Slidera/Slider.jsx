import React, { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import './Slider.scss';

import { Autoplay, Pagination } from 'swiper/modules';


export const Slider = () => {
  const { dataDB } = useContext(ReactContext);

  const images = dataDB.settings[0].slider.split(',')

  return  <>
    { (dataDB.length === 0) ? <div>Помилка</div> :
        (dataDB.settings[0].slider === '') ? null : (
          <Swiper 
            pagination={true} 
            modules={[Autoplay, Pagination]} 
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >

            {images.map((e, index) => {
                return (
                  <SwiperSlide key={index}><img src={e} alt='img-slider'/></SwiperSlide>
                )
            })
            }
          </Swiper>
      )
    }
  </>
}
