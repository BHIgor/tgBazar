import { useContext, } from 'react';
import { ReactContext } from "../../../../context/ReactContext"
import { animateScroll as scroll } from 'react-scroll';
import { Swiper, SwiperSlide} from "swiper/react";
import './ProductSlider.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';

const tg = window.Telegram.WebApp;

export const ProductSlider = ({products}) =>{
  const { dataDB, setDataDB } = useContext(ReactContext);

  const scrollToTop = () => {
    scroll.scrollToTop({duration:20});
  };

  const addToCart = (x, count = 1) => {
    const product = dataDB.cart
    dataDB.allCartCount +=  count
    let foundObject = product.find(e => e.id === x.id);
  
    if (foundObject) {
      foundObject.count++;
    } else {
      product.push({ ...x, count: 1 });
    }
  
    setDataDB({...dataDB, cart: product} )
  }

  const addLike = (id) => {
    try{
      fetch(`https://tgbazar.com.ua/liked`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({nameShop: dataDB.listBot[0].nameShop,id: id, idUser: tg?.initDataUnsafe?.user?.id})
      })
      .then((response) => {
        return response.json();
      })
  
      const copyData = { ...dataDB }

      if(copyData.liked.includes(String(id))) {
        const newArr = copyData.liked.filter(item => item !== String(id));
        copyData.liked.splice(0)

        newArr.map(e => copyData.liked.push(e))
        setDataDB(copyData)

      } else {
        copyData.liked.push(String(id))
        setDataDB(copyData)
      }

    } catch (e) {
      return false;
    }
  }

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="productSlider">
        <div className='productSlider__block'>
         
          <div className="productSlider__container">
          <Swiper
             slidesPerView={2}
             spaceBetween={10}
             modules={[Autoplay]} 
             autoplay={{
               delay: 3000,
               disableOnInteraction: false,
             }}
             className="main__sliderProduct"
           > 
            {products.map(e => {
              const images = e.image.split(',')
              return (
                <SwiperSlide className='main__sliderProduct--item' key={e.id}  >
                <div  className='productSlider__page'>
                  <div className='productSlider__page--imgBlock'>
                    <img 
                      src={images[0]} 
                      alt='Нема фото' 
                      className='productSlider__page--image'
                      />
                  </div>
                
                  <div 
                    className="productSlider__page--blockIcon"
                    onClick={() => addLike(e.id)}          
                  >
                    <div className={dataDB.liked?.includes(String(e.id)) ?"productSlider__page--iconActive" :"productSlider__page--icon"}>
                      
                    </div>
                  </div>

                  <Link 
                    to={`/Product/${e.id}?${dataDB.listBot[0].nameShop}`}   
                    onClick={() =>scrollToTop()} 
                    className='productSlider__page--title'>
                    {e.title} 
                  </Link>  
                  
                  {(e.nayavno === 'yes') ? (<>
                    <div className='productSlider__page--nalRegion productSlider__page--nalBlock'>
                      <div className='productSlider__page--nayavno'></div>
                      <div className='productSlider__page--nal'>
                        Є в наявності
                      </div>
                    </div></>
                  ): (<>
                    <div className='productSlider__page--nalRegion productSlider__page--noNalBlock'>
                      <div className='productSlider__page--noNayavno'></div>
                      <div className='productSlider__page--noNal'>
                        Немає в наявності
                      </div>
                    </div>
                  </>)}

                  <div className="productSlider__info">
                    <div className="productSlider__stars productSlider__stars">
                      <div className={`productSlider__stars productSlider__stars--star productSlider__stars productSlider__stars--star--${e.stars}`}></div>
                      <div className={`productSlider__stars productSlider__stars--star productSlider__stars productSlider__stars--star--${e.stars}`}></div>
                      <div className={`productSlider__stars productSlider__stars--star productSlider__stars productSlider__stars--star--${e.stars}`}></div>
                      <div className={`productSlider__stars productSlider__stars--star productSlider__stars productSlider__stars--star--${e.stars}`}></div>
                      <div className={`productSlider__stars productSlider__stars--star productSlider__stars productSlider__stars--star--${e.stars}`}></div>
                    </div> 
                    <div className='productSlider__review'>
                       Код: {e.id} 
                    </div>     
                  </div>  
                {
                  (e.description !=='')?(
                  <Link 
                    to={`/Product/${e.id}?${dataDB.listBot[0].nameShop}`}  
                    onClick={() =>scrollToTop()}  
                    className="productSlider__page--description">
                    <div className="productSlider__page--description-text">
                      {e.description}
                    </div>
                  </Link>
                  ):null
                }
              
                <div className="productSlider__page--footer">
                  {
                    (e.price_discount===0) ? (
                      <span className="productSlider__page--priceDiscount">
                      {e.price} <span className="productSlider__page--price--simvol">₴</span>
                      </span>

                    ) : (<>
                      <span className="productSlider__page--priceDiscount" style={{color: 'red'}}> 
                        {e.price_discount} 
                        <span className="productSlider__page--priceDiscount--simvol">
                          ₴
                        </span>
                      </span>
                      <span className="productSlider__page--price" >
                      <span className="productSlider__page--price--line"> 
                        {e.price} 
                      </span>
                      <span className="productSlider__page--price--simvol">
                        ₴
                      </span>
                      <span  className="productSlider__page--price--procent">-{Math.floor(100 - ((e.price_discount * 100) / e.price))}%</span>
                      </span>

                  </>)
                  }

                <div className='productSlider__page--buy' onClick={() => addToCart(e)} >
                  <div className="productSlider__page--buyBlock" style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}>
                    <div className="productSlider__page--buyIcon"></div>
                  </div>
                </div>  
                </div>
                  
              
                  

                </div>
                </SwiperSlide>
              )
            })}

          </Swiper>
          </div> 
        </div> 
      </div>
    </>
    }
  </>
}