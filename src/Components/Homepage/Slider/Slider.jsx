import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Slider.scss';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const imgas = ['https://i.work.ua/article/579b.jpg', 'https://www.interfax.ru/ftproot/photos/photostory/2019/07/09/week4_700.jpg', 'https://lifehacker.ru/special/fujifilm/dist/static/img/5.2410a2d.jpg', 'https://tengrinews.kz/userdata/news/2021/news_454230/thumb_m/photo_380266.jpeg']

export const Slider = () => {
  return (
    <>
      <Swiper 
        pagination={true} 
        modules={[Autoplay, Pagination]} 
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >

        {
          imgas.map(e => {
            return (
              <SwiperSlide><img src={e} /></SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
}
