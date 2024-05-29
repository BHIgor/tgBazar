import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


import './ProductPage.scss';


export const ProductPage = () =>{
  const dataDB = useContext(ReactContext);

  let { productId } = useParams();

  const selectedProduct = (dataDB.length === 0)? null :dataDB.products.filter(e => e.id === Number(productId))

  const images = (selectedProduct !== null)? selectedProduct[0].image.split(',') :[]

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className='productPage'>
        {
          selectedProduct.map(e => (
          <div key={e.id}>
            <div className='productPage__title'>{e.title}</div>
            <div className='productPage__titleInfo'>
              <div className="productPage__stars">
                <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
              </div> 
              <div className="productPage__id">Код: {e.id}</div>
            </div>

            <div className="productPage__nal">
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

              <div className="productPage__titleInfo--blockIcon">
                <div className="product__page--icon"></div>
              </div>
            </div>

            <div className="productPage__image">
              <Swiper
                className='productPage__mySwipers' 
                pagination={true} 
                modules={[Pagination]} 
                >
                {images.map(e => {
                  return (
                      <SwiperSlide key={e}><img src={e} alt='img-slider' style={{height: '100%',width:'auto'}} /></SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>

            <div className="productPage__price">
            {
              (e.price_discount===0) ? (
                <span className="productPage--priceDiscount">
                {e.price} <span className="productPage--price--simvol">₴</span>
                </span>

              ) : (<>
                  <span className="productPage--priceDiscount" style={{color: 'red'}}> 
                    {e.price_discount} 
                    <span className="productPage--priceDiscount--simvol">
                      ₴
                    </span>
                  </span>
                  <span className="productPage--price" >
                  <span className="productPage--price--line"> 
                    {e.price} 
                  </span>
                  <span className="productPage--price--simvol">
                    ₴
                  </span>
                  <span  className="productPage--price--procent">-{100 - ((e.price_discount * 100) / e.price)}%</span>
                  </span>

              </>)
              }
            </div>    
          </div>))
        }
      </div>
    </>
    }
  </>
}