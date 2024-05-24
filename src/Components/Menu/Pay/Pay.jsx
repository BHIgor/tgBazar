import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

export const Pay = () =>{
  const dataDB = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div>
          Оплата
      </div>
    </>
    }
  </>
}