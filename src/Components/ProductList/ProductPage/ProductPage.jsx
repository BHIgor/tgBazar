import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { useParams } from 'react-router-dom';

import './ProductPage.scss';


export const ProductPage = () =>{
  const dataDB = useContext(ReactContext);

  let { productId } = useParams();

  const selectedProduct = dataDB.products.filter(e => e.id === Number(productId))

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className='productPage'>
        {
          selectedProduct.map(e => (
            <div>{e.title}</div>
          ))
        }
      </div>
    </>
    }
  </>
}