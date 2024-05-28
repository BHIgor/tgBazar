import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { useParams } from 'react-router-dom';

import './ProductPage.scss';


export const ProductPage = () =>{
  const dataDB = useContext(ReactContext);

  let { productId } = useParams();

  console.log(productId)

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div>
       afsas
      </div>
    </>
    }
  </>
}