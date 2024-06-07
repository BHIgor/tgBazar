import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

export const Garant = () =>{
  const { dataDB } = useContext(ReactContext);
  
  const garant = (dataDB.length === 0) ? '' : dataDB.settings[0].garant
  const textGarant = garant.replace(/\n/g, '<br>')
  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="titleText">Гарантійні умови</div>
      <div id={'top'} className='textAlg'  dangerouslySetInnerHTML={{ __html: textGarant }} >
   
      </div>
    </>
    }
  </>
}