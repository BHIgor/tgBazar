import { useContext, useEffect, useState } from 'react';
import { ReactContext } from "../../context/ReactContext"

import './ProductList.scss';

import { Product } from './Product/Product'

export const ProductList = () =>{
  const { dataDB } = useContext(ReactContext);
  const allProducts = dataDB.products
  const [sortedItems, setSortedItems] = useState([]);
  const [sortType, setSortType] = useState('');
 
  useEffect(() => {
    const visibleProduct = []

    if(window.location.pathname === '/'){
      allProducts.map(e => e.top === 'yes' ? visibleProduct.push(e) : null)
    } 

    setSortedItems(visibleProduct);

  },[allProducts]);

  const sortByPrice = (order) => {
    const sorted = sortedItems.slice().sort((a, b) => (order === 'desc' ? ((b.price_discount === 0) ? b.price: b.price_discount) - ((a.price_discount === 0) ? a.price: a.price_discount) : ((a.price_discount === 0) ? a.price: a.price_discount) - ((b.price_discount === 0) ? b.price: b.price_discount)));
    setSortType(order);
    setSortedItems(sorted);

  };

  const sortByRating = (order) => {
    const sorted = sortedItems.slice().sort((a, b) => (order === 'asc' ? a.stars - b.stars : b.stars - a.stars));
    setSortType(order);
    setSortedItems(sorted);
  };

  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;
    if (selectedSortType === 'priceAsc' || selectedSortType === 'priceDesc') {
      setSortType(selectedSortType);
      sortByPrice(selectedSortType === 'priceAsc' ? 'asc' : 'desc');
    } else if (selectedSortType === 'ratingAsc' || selectedSortType === 'ratingDesc') {
      setSortType(selectedSortType);
      sortByRating(selectedSortType === 'ratingAsc' ? 'asc' : 'desc');
    }
  };


  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="productList">
        <div className="productList__block">
         <div className='main__titleBlock'>
            <div className='main__title--flex'>
              <div className="main__title--icon"></div>
              <div className='main__title'>Топ продаж</div>
            </div>
          </div>

          <select 
              defaultValue={sortType} 
              onChange={handleSortChange} 
              className="kategory__sort--selected productList__selected"
              >
                <option value="" disabled>Сортувати</option>
                <option value="priceAsc">За зростанням ціни</option>
                <option value="priceDesc">За спаданням ціни</option>
                <option value="ratingAsc">За зростанням рейтингу</option>
                <option value="ratingDesc">За спаданням рейтинга</option>
            </select>    
        </div>
         
        <div className="container container--productList">
          <Product products = {sortedItems}/>
        </div>  
      </div>
    </>
    }
  </>
}