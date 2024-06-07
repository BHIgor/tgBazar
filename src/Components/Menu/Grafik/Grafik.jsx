import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

export const Grafik = () =>{
  const { dataDB } = useContext(ReactContext);
  
  const grafik = (dataDB.length === 0) ? '' : dataDB.settings[0].grafik
  const textGrafik = grafik.replace(/\n/g, '<br>')
  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="titleText">Графік роботи</div>
      <div id={'top'} className='textAlg'  dangerouslySetInnerHTML={{ __html: textGrafik }} >
   
      </div>
    </>
    }
  </>
}