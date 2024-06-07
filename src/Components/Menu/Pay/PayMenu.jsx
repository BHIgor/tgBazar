import './Pay.scss'

import { Pay } from './Pay'

export const PayMenu = () =>{

  return <> 
    { 
      <div>
        <div className="deliveryMenu">
          Оплата
        </div> 
        <Pay/>
      </div>
    }
  </>
}