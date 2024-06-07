import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Contacts.scss'

export const Contacts = () =>{
  const { dataDB } = useContext(ReactContext);

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className="titleText">Контакти</div>
      <div className="contact">
        <div className="contact__container">
          {
            (dataDB.settings[0].phoneOne !== '') ?
              <div className="contact__block">
                <div className="contact__icon contact__block--phoneOne" ></div>

                <div className="contact__text">
                  {dataDB.settings[0].phoneOne}
                </div>
              </div>
            :null
          }

          {
            (dataDB.settings[0].phoneTwo !== '') ?
              <div className="contact__block">
                <div className="contact__icon contact__block--phoneTwo" ></div>

                <div className="contact__text">
                  {dataDB.settings[0].phoneTwo}
                </div>
              </div>
            :null
          }

          {
            (dataDB.settings[0].email !== '') ?
              <div className="contact__block">
                <div className="contact__icon contact__block--email" ></div>

                <div className="contact__text">
                  {dataDB.settings[0].email}
                </div>
              </div>
            :null
          } 

          {
            (dataDB.settings[0].telegaContact !== '') ?
              <div className="contact__block">
                <div className="contact__icon contact__block--telegaContact" ></div>

                <a href={dataDB.settings[0].telegaContact} className="contact__text">
                  {dataDB.settings[0].telegaContact}
                </a>
              </div>
            :null
          }

          {
            (dataDB.settings[0].instaContact !== '') ?
              <div className="contact__block">
                <div className="contact__icon contact__block--instaContact" ></div>

                <a href={dataDB.settings[0].instaContact} className="contact__text">
                  {dataDB.settings[0].instaContact}
                </a>
              </div>
            :null
          }   

          {
            (dataDB.settings[0].viberContact !== '') ?
              <div className="contact__block">
                <div className="contact__icon contact__block--viberContact" ></div>

                <div className="contact__text">
                  {dataDB.settings[0].viberContact}
                </div>
              </div>
            :null
          }    
        </div>
      </div>
    </>
    }
  </>
}