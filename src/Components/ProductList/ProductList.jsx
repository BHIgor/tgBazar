import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"

import './ProductList.scss';

export const ProductList = () =>{
  const dataDB = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="productList">
        <div className="container container--productList">
            продуктлистр
        </div>  
      </div>
    </>
    }
  </>
}