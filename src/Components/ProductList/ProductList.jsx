import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"

import './ProductList.scss';

import { Product } from './Product/Product'

export const ProductList = () =>{
  const dataDB = useContext(ReactContext);
  const allProducts = dataDB.products

  const visibleProduct = []

  if(window.location.pathname === '/'){
    allProducts.map(e => e.main === 'yes' ? visibleProduct.push(e) : null)
  } 

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="productList">
        <div className="container container--productList">
          <Product products = {visibleProduct}/>
        </div>  
      </div>
    </>
    }
  </>
}