import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Katalog.scss'

export const Katalog = () =>{
  const { dataDB } = useContext(ReactContext);

  const allProducts = (dataDB.length === 0)? [] :dataDB.products

  const uniqueCategories = new Set(allProducts.map(product => product.kategory));
  const uniquArray = Array.from(uniqueCategories);

  const arrTag = [];

  for(let i = 0; i < uniquArray.length; i = i + 2){
      arrTag.push(<div className='katalog__block' key={i} >   
      {
        (uniquArray[i + 1] !== undefined) ?
          <div className="katalog__container">
            <div className="katalog__item">
              {uniquArray[i]}  
            </div>

            <div className="katalog__item">
              {uniquArray[i + 1]}  
            </div> 
          </div>  
        : 
        <div className="katalog__container" style={{gridTemplateColumns: '1fr'}}>
          <div className="katalog__item">
            {uniquArray[i]}  
          </div>
        </div>  
      }
      
    </div>)
  }

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="titleText">Каталог</div>
      <div className='katalog'>
          {arrTag}
      </div>
    </>
    }
  </>
}