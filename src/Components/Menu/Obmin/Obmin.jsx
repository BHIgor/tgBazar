import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

export const Obmin = () =>{
  const { dataDB } = useContext(ReactContext);
  
  const obmin = (dataDB.length === 0) ? '' : dataDB.settings[0].obmin
  const textObmin = obmin.replace(/\n/g, '<br>')
  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="titleText">Обмін і повернення</div>
      <div id={'top'} className='textAlg'  dangerouslySetInnerHTML={{ __html: textObmin }} >
   
      </div>
    </>
    }
  </>
}