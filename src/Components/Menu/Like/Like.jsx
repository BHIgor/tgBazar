import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

export const Like = () =>{
  const dataDB = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div>
          Лайк
      </div>
    </>
    }
  </>
}