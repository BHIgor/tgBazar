import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"

import './FooterLine.scss';

export const FooterLine = ({ setMenu }) =>{
  const dataDB = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="footerLine">
        <div className="footerLine--container">
         <div className="footerLine--menu footerLine--size"></div>
         <div className="footerLine--catalog footerLine--size"></div>
         <div className="footerLine--cart footerLine--size"></div>
         <div className="footerLine--like footerLine--size"></div>
         <div className="footerLine--home footerLine--size"></div>
        </div>

      </div>
    </>
    }
  </>
}