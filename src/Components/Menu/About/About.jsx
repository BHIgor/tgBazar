import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

export const About = () =>{
  const dataDB = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div>
          Про нас
      </div>
    </>
    }
  </>
}