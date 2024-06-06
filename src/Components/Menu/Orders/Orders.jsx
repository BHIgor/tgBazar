import { useContext, useEffect } from 'react';
import { ReactContext } from "../../../context/ReactContext"

import './Orders.scss'
const tg = window.Telegram.WebApp;

export const Orders = () =>{
  const { dataDB, setDataDB } = useContext(ReactContext);

  const allProducts = dataDB.products
  const orderProducts = dataDB.orders
  const myProduct = []

  function Datas(){
    useEffect(() => {
      try{
        fetch(`https://tgbazar.com.ua/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({nameShop: dataDB.listBot[0].nameShop, idUser: tg?.initDataUnsafe?.user?.id })
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setDataDB(data);
        });
      } catch (e) {
      
      }
    }, [])
  }
  Datas()

  orderProducts?.forEach(e => {
    const product = allProducts.find(s => s.id === Number(e.idProduct))

    if (product) {
      return myProduct.push({ ...e, ...product })
    }
  })

  console.log(myProduct)
  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className='orders'>
          {myProduct.map(e => {
            const images = e.image.split(',')
          return (
            <div className="orders__product" key={e.ids}>
              <div className="orders__header">
                <div className="orders__status">
                  <div className="orders__status--title subtitle">
                    Статус замовлення
                  </div>

                  <div 
                    className="orders__status--text" 
                    style={(e.status === 'Новий') ? {color: 'red'}: (e.status === 'Виконано') ? {color: 'green'}: null}
                  >
                    {e.status}
                  </div>
                </div>

                <div className="orders__header--blockimg">
                 <div className="orders__header--deleteIcon"></div>
                </div>
              </div>
              
              <div className="orders__infoProduct">
                <div className='orders__infoProduct--imgBlock'>
                  <img 
                    src={images[0]} 
                    alt='Нема фото' 
                    className='orders__infoProduct--image'
                    />
                </div>

                <div className="orders__infoProduct--title">
                  {e.title}
                </div>
              </div>

              <div className="orders__countProduct">
                <div className="orders__countProduct--count">
                  {e.count} шт.
                </div>

                <div className="orders__countProduct--price">
                  {((e.price_discount === 0)? e.price: e.price_discount) * e.count}<span className='orders__countProduct--simvol'>₴</span>
                </div>
              </div>

              <hr className='orders__line' />

              <div className="orders__dostavka">
                <div className="orders__dostavka--text">
                  Доставка
                </div>

                <div className="orders__dostavka--value">
                  за тарифами перевізника
                </div>
              </div>

              <hr className='orders__line' />

              <div className="orders__userName">
                <div className="orders__userName--text subtitle">
                  Ім'я одержувача
                </div>

                <div className="orders__userName--value">
                  {e.nameUser}
                </div>
              </div>

              <hr className='orders__line' />

              <div className="orders__userPhone">
                <div className="orders__userPhone--text subtitle">
                  Телефон одержувача
                </div>

                <div className="orders__userPhone--value">
                  {e.phoneUser}
                </div>
              </div>
              {
                (e.telegram !== '')? 
                <>
                  <hr className='orders__line' />

                  <div className="orders__userPhone">
                    <div className="orders__userPhone--text subtitle">
                      Telegram одержувача
                    </div>

                    <div className="orders__userPhone--value">
                      {e.telegram}
                    </div>
                  </div>
                </> : null
              }

              {
                (e.insta !== '')? 
                <>
                  <hr className='orders__line' />

                  <div className="orders__userPhone">
                    <div className="orders__userPhone--text subtitle">
                      Instagram одержувача
                    </div>

                    <div className="orders__userPhone--value">
                      {e.insta}
                    </div>
                  </div>
                </> : null
              }
              <hr className='orders__line' />

              <div className="orders__oplata">
                <div className="orders__oplata--text subtitle">
                  Спосіб оплати
                </div>
              
                <div className="orders__oplata--value">
                  {
                    (e.oplata === 'otriman') ? 'Оплата при отриманні' :
                    (e.oplata === 'rekvizit') ? 'Перевод по реквізитам' :
                    (e.oplata === 'karta') ? 'Перевод на карту' : null
                  }
                </div>
              </div>

              <hr className='orders__line' />

              <div className="orders__delivery">
                <div className="orders__delivery--text subtitle">
                  Спосіб доставки
                </div>
                
                <div className="orders__delivery--value">
                  {
                    (e.dostavka === 'nova') ? 'Нова пошта' :
                    (e.dostavka === 'ukr') ? 'Укр пошта' :
                    (e.dostavka === 'meest') ? 'Meest пошта' :
                    (e.dostavka === 'kurier') ? `Кур'єр` :
                    (e.dostavka === 'rozetka') ? 'Магазини Rozetka' :
                    (e.dostavka === 'sam') ? 'Самовивіз' : null
                  }
                </div>
              </div>

              <hr className='orders__line' />

              <div className="orders__adress">
                <div className="orders__adress--text subtitle">
                  Адреса доставки
                </div>

                <div className="orders__adress--value">
                  {(e.dostavka === 'nova') ? <>{e.city} {e.viddilenya}</> : <>{e.adress}</>} 
                </div>
              </div>
              {
                (e.coment !== '') ? 
                <>
                  <hr className='orders__line' />
                    
                  <div className="orders__adress">
                    <div className="orders__adress--text subtitle">
                      Коментар
                    </div>
    
                    <div className="orders__adress--value">
                      {e.coment} 
                    </div>
                  </div>
                </> :null
              }
              
            </div>
          )})}
      </div>
    </>
    }
  </>
}