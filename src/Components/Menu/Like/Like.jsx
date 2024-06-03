import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { Product } from '../../ProductList/Product/Product';

import './Like.scss'

export const Like = () =>{
  const { dataDB } = useContext(ReactContext);
  const allProducts = dataDB.products

  const visibleProduct =  allProducts?.filter(product => dataDB?.liked?.includes(String(product.id)));

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="like">
        <div className="like__title">
            {(visibleProduct.length > 0)?'Товари які ви обрали': 'Ви не обрали жодного товару'}
        </div>
        <Product products = {visibleProduct}/>
      </div>
    </>
    }
  </>
}