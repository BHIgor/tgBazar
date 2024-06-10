import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { Search } from '../Search/Search';

import './SearchResult.scss';
import { Product } from '../../ProductList/Product/Product';


export const SearchResult = ( ) =>{
  const { dataDB } = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="searchResult">
        
        <Search/>

        <div className="searchResult--title">
          Результат пошуку
        </div>

        <Product  products = {dataDB.search} />
      </div>
    </>
    }
  </>
}