import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Pay.scss'

export const Pay = () =>{
  const { dataDB } = useContext(ReactContext);

  const pay = (dataDB.length === 0) ? '' : dataDB.settings[0].pay
  const arrPay = pay.split(',')

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
    <div className='delivery'>
        <div className="delivery__container">
          {
            (arrPay.includes('Оплата при отриманні')) ?
              <div className="pay__block">
                <div className="delivery__icon pay__block--otr" ></div>

                <div className="pay__text">
                  Оплата при отриманні
                </div>
              </div>
            :null
          }

          {
            (arrPay.includes('Перевод по реквізитам')) ?
              <div className="pay__block">
                <div className="delivery__icon pay__block--rekv" ></div>

                <div className="pay__text">
                  Перевод по реквізитам
                </div>
              </div>
            :null
          }

          {
            (arrPay.includes('Перевод на карту')) ?
              <div className="pay__block">
                <div className="delivery__icon pay__block--karta" ></div>

                <div className="pay__text">
                  Перевод на карту
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