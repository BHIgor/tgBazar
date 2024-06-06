import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Delivery.scss'

export const Delivery = () =>{
  const { dataDB } = useContext(ReactContext);

  const dostavka = (dataDB.length === 0) ? '' : dataDB.settings[0].delivery
  const arrDostavka = dostavka.split(',')

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className='delivery'>
        <div className="delivery__container">
          {
            (arrDostavka.includes('Нова пошта')) ?
              <div className="delivery__block">
                <div className="delivery__icon delivery__block--nova" ></div>

                <div className="delivery__text">
                  Нова пошта
                </div>
              </div>
            :null
          }

          {
            (arrDostavka.includes('Укр пошта')) ?
              <div className="delivery__block">
                <div className="delivery__icon delivery__block--ukr" ></div>

                <div className="delivery__text">
                  Укр пошта
                </div>
              </div>
            :null
          } 

          {
            (arrDostavka.includes('Meest пошта')) ?
              <div className="delivery__block">
                <div className="delivery__icon delivery__block--meest" ></div>

                <div className="delivery__text">
                  Meest пошта
                </div>
              </div>
            :null
          } 

          {
            (arrDostavka.includes(`Магазини Rozetka`)) ?
              <div className="delivery__block">
                <div className="delivery__icon delivery__block--rozetka" ></div>

                <div className="delivery__text">
                  Магазини Rozetka
                </div>
              </div>
            :null
          } 

          {
            (arrDostavka.includes(`Кур'єр`)) ?
              <div className="delivery__block">
                <div className="delivery__icon delivery__block--kurier" ></div>

                <div className="delivery__text">
                  Кур'єр
                </div>
              </div>
            :null
          } 

          {
            (arrDostavka.includes(`Самовивіз`)) ?
              <div className="delivery__block">
                <div className="delivery__icon delivery__block--sam" ></div>

                <div className="delivery__textBlock">
                  <div className="delivery__text">
                    Самовивіз: {dataDB.settings[0].adress}
                  </div>
                </div>
                
              </div>
            :null
          } 

          
        </div>
      </div>
    </>
    }
  </>
}