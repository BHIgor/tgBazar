import { useContext, useEffect, useState } from "react"
import { ReactContext } from "../../context/ReactContext"
import { Link } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';

import './Homepage.scss';

import { Slider } from "./Slidera/Slider";
import { ProductList } from '../ProductList/ProductList'

import { ProductSlider } from "../ProductList/Product/ProductSlider/ProductSlider";
import { Search } from "./Search/Search";

const tg = window.Telegram.WebApp;


export const Homepage = () =>{
 const {dataDB} = useContext(ReactContext);
 const [saleProduct, setSaleProduct] = useState([]);

  tg.ready()

  const scrollToTop = () => {
    scroll.scrollToTop({duration:20});
  };

  const hasDiscountedProducts = (dataDB.length !== 0) ? dataDB.products.some(product => product.price_discount > 0): false

  const hasTop = (dataDB.length !== 0) ? dataDB.products.some(product => product.top === 'yes'): false

  

  useEffect(() => {
    const discountProduct = []

    dataDB?.products?.map(e => (e.price_discount > 0) ? discountProduct.push(e): null)

    setSaleProduct(discountProduct)
  },[dataDB]);


  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <main className="main">
      
      <Search/>

      <Slider/>

      <div className="main__center">
        <Link to='/Katalog' onClick={()=> scrollToTop()} className="main__katalog">
          <div className="main__katalog--icon"></div>  
          <div  className="main__katalog--text">Каталог</div>
        </Link>
      </div>
      
      { 
        (hasTop) ?
          <ProductList />
          : null
      }

      { 
        (hasDiscountedProducts) ?<>
        <div className="main__discountBlock">
          <div className="main__discountBlock--header">
            <div className="main__discountBlock--icon"></div>
            <div className="main__discountBlock--title">
              Товари зі знижкою
            </div>
          </div>
        </div>  

        <ProductSlider products = {saleProduct} className='main__sliderDisck'/>
        </>
        
        :null
      }
    
      </main>
      
     
      </>
    }
  </>
}