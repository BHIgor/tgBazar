import { useContext, useState } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import './ProductPage.scss';
import { Delivery } from '../../Menu/Delivery/Delivery';
const tg = window.Telegram.WebApp;

export const ProductPage = () =>{
  const { dataDB, setDataDB } = useContext(ReactContext);
  const [desck, setDesck] = useState('opis')

  tg.ready()


  let { productId } = useParams();

  const selectedProduct = (dataDB.length === 0)? null :dataDB.products.filter(e => e.id === Number(productId))
  const images = (selectedProduct !== null)? selectedProduct[0].image.split(',') :[]

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

              <div className="productPage__titleInfo--blockIcon"  onClick={() => addLike(e.id)} >
                <div className={dataDB.liked?.includes(String(e.id)) ?"product__page--iconActive" :"product__page--icon"}>
                      
                </div>
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
            <div className="productPage__blockPrice">
              <div className="productPage__price">
              {
                (e.price_discount===0) ? (
                  <span className="productPage--priceDiscount">
                  {e.price}<span className="productPage--price--simvol">₴</span>
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
                    <span  className="productPage--price--procent">-{Math.floor(100 - ((e.price_discount * 100) / e.price))}%</span>
                    </span>

                </>)
                }
              </div> 

              <div className="productPage__buyBlock">
                <div 
                className="productPage__buy" 
                style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}
                onClick={() => addToCart(e)}
                >
                  <div className="productPage__buy--icon"></div>
                  <div className="productPage__buy--text">Купити</div>
                </div>
                { // onClick={() => (copy) ? setCopy(false) : setCopy(true)}
                  (dataDB.listBot[0].linkShop !== '') ? 
                  <a href={`https://t.me/share/url?url=${`${dataDB.listBot[0].linkShop}?start=${e.id}-${dataDB.listBot[0].nameShop}&text=${`Посилання на товар`}`}`} className={`productPage__share`}>
                    <div className='productPage__share--icon'></div>
                  </a> 
                :null
                }
                
              </div>
              
            </div>  

            <div className="productPage__description">
                <div className="productPage__description--titleBlock">
                  <div onClick={() => setDesck('opis')}
                  className="productPage__description--title"  style={(desck === 'opis') ?{borderBottom: `4px solid ${dataDB.settings[0].clHeader}`}:null}>
                    Опис
                  </div>

                  <div onClick={() => setDesck('dostavka')}
                  className="productPage__description--title"  style={(desck === 'dostavka') ?{borderBottom: `4px solid ${dataDB.settings[0].clHeader}`}:null}>
                    Доставка
                  </div>

                  <div onClick={() => setDesck('oplata')}
                  className="productPage__description--title" style={(desck === 'oplata') ?{borderBottom: `4px solid ${dataDB.settings[0].clHeader}`}:null}>
                    Оплата
                  </div>
                </div>
                
                <div className="productPage__description--text">
                  {
                    (desck === 'opis') ? <>
                    {e.description}
                    </> : (desck === 'dostavka') ? <>
                      <Delivery />
                    </> : (desck === 'oplata') ? <>
                      Оплата
                    </> : null
                  }
                 
                </div>
            </div>   

          </div>
          ))
        }
      </div>
    </>
    }
  </>
}