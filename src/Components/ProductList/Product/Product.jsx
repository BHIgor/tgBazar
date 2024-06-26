import { useContext, } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { animateScroll as scroll } from 'react-scroll';

import './Product.scss';
import { Link } from 'react-router-dom';

const tg = window.Telegram.WebApp;

export const Product = ({products}) =>{
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
      <div className="product">
        <div className='product__block'>
         
          <div className="product__container">
            {products.map(e => {
              const images = e.image.split(',')
              return (
                <div key={e.id} className='product__page'>
                  <div className='product__page--imgBlock'>
                    <img 
                      src={images[0]} 
                      alt='Нема фото' 
                      className='product__page--image'
                      />
                  </div>
                
                  <div 
                    className="product__page--blockIcon"
                    onClick={() => addLike(e.id)}          
                  >
                    <div className={dataDB.liked?.includes(String(e.id)) ?"product__page--iconActive" :"product__page--icon"}>
                      
                    </div>
                  </div>

                  <Link 
                    to={`/Product/${e.id}?${dataDB.listBot[0].nameShop}`}   
                    onClick={() =>scrollToTop()} 
                    className='product__page--title'>
                    {e.title} 
                  </Link>  
                  
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

                  <div className="product__info">
                    <div className="product__stars product__stars">
                      <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                      <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                      <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                      <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                      <div className={`product__stars product__stars--star product__stars product__stars--star--${e.stars}`}></div>
                    </div> 
                    <div className='product__review'>
                       Код: {e.id} 
                    </div>     
                  </div>  
                {
                  (e.description !=='')?(
                  <Link 
                    to={`/Product/${e.id}?${dataDB.listBot[0].nameShop}`}  
                    onClick={() =>scrollToTop()}  
                    className="product__page--description">
                    <div className="product__page--description-text">
                      {e.description}
                    </div>
                  </Link>
                  ):null
                }
              
                <div className="product__page--footer">
                  {
                    (e.price_discount===0) ? (
                      <span className="product__page--priceDiscount">
                      {e.price} <span className="product__page--price--simvol">₴</span>
                      </span>

                    ) : (<>
                      <span className="product__page--priceDiscount" style={{color: 'red'}}> 
                        {e.price_discount} 
                        <span className="product__page--priceDiscount--simvol">
                          ₴
                        </span>
                      </span>
                      <span className="product__page--price" >
                      <span className="product__page--price--line"> 
                        {e.price} 
                      </span>
                      <span className="product__page--price--simvol">
                        ₴
                      </span>
                      <span  className="product__page--price--procent">-{Math.floor(100 - ((e.price_discount * 100) / e.price))}%</span>
                      </span>

                  </>)
                  }

                <div className='product__page--buy' onClick={() => addToCart(e)} >
                  <div className="product__page--buyBlock" style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}>
                    <div className="product__page--buyIcon"></div>
                  </div>
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