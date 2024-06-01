import { useContext } from 'react';
import { ReactContext } from "../../context/ReactContext"

import './Footer.scss';

export const Footer = ({ setMenu }) =>{
  const { dataDB } = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <footer className="footer">
        <div className="container footer--container"  style={{backgroundColor: `${dataDB.settings[0].clFooter}`}}>
          {
            (dataDB.settings[0].viber !== '' || dataDB.settings[0].telegram !== '' || dataDB.settings[0].instagram !== '' || dataDB.settings[0].facebook !== '' || dataDB.settings[0].tiktok !== '')? 
            <>
              <div className='footer__title' style={{color: `${dataDB.settings[0].clFooterTitle}`}}>Ми в соц. мережах:</div>
              <div className='footer__icons'>
                {
                  (dataDB.settings[0].viber !== '') ? <a 
                    href={dataDB.settings[0].viber} 
                    target="_blank" 
                    rel="noopener noreferrer"  className="footer__icons--viber footer__icons--size"><span></span></a>:null
                }
                {
                  (dataDB.settings[0].telegram !== '') ? <a 
                    href={dataDB.settings[0].telegram} 
                    target="_blank" 
                    rel="noopener noreferrer" className="footer__icons--telegram footer__icons--size"><span></span></a>:null
                }
                {
                  (dataDB.settings[0].instagram !== '') ? <a 
                    href={dataDB.settings[0].instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"  
                    className="footer__icons--instagram footer__icons--size"><span></span></a>:null
                }
                {
                  (dataDB.settings[0].facebook !== '') ? <a 
                    href={dataDB.settings[0].facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"  
                    className="footer__icons--facebook footer__icons--size"><span></span></a>:null
                }
                {
                  (dataDB.settings[0].tiktok !== '') ? <a 
                    href={dataDB.settings[0].tiktok} 
                    target="_blank" 
                    rel="noopener noreferrer"  
                    className="footer__icons--tiktok footer__icons--size"><span></span></a>:null
                }
              </div>
            </> :null
          }
        </div>
        <div className='footer__ads'>
          Розроблено за допомогою @tgbazarShop
        </div>
      </footer>
    </>
    }
  </>
}