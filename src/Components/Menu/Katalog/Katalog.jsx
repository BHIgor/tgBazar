import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

export const Katalog = () =>{
  const dataDB = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div>
          Каталог
      </div>
    </>
    }
  </>
}