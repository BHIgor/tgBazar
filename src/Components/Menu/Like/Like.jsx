import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { Product } from '../../ProductList/Product/Product';

export const Like = () =>{
  const { dataDB } = useContext(ReactContext);
  const allProducts = dataDB.products

  const visibleProduct =  allProducts.filter(product => dataDB.liked.includes(String(product.id)));

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div>
       <Product products = {visibleProduct}/>
      </div>
    </>
    }
  </>
}