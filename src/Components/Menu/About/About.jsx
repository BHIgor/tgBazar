import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './About.scss'

export const About = () =>{
  const { dataDB } = useContext(ReactContext);

  const about = (dataDB.length === 0) ? '' : dataDB.settings[0].about
  const textAbout = about.replace(/\n/g, '<br>')
  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="titleText">Про нас</div>
      <div id={'top'} className='textAlg'   dangerouslySetInnerHTML={{ __html: textAbout }}>

      </div>
    </>
    }
  </>
}