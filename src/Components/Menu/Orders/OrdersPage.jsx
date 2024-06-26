import { useContext } from 'react';
import { ReactContext } from "../../../context/ReactContext"
import { Link, useParams } from 'react-router-dom';

import './Orders.scss'


export const OrdersPage = () =>{
  const { dataDB } = useContext(ReactContext);

  let { orderId } = useParams();

  const selectedOrder= (dataDB.length === 0)? null :dataDB.allOrders.filter(e => e.ids === Number(orderId))
  

  const allProducts = dataDB.products
  const myOrder = []

  selectedOrder?.forEach(e => {
    const product = allProducts.find(s => s.id === Number(e.idProduct))

    if (product) {
      return myOrder.push({ ...e, ...product })
    }
  })

  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div className='orders'>
        <div className="orders__title">
          Замовлення №{orderId}
        </div>
        {myOrder.map(e => {
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
                    style={
                      (e.status === 'Новий') ?{color: 'orange'}: 
                      (e.status === 'Виконано') ? {color: 'green'}: 
                      (e.status === 'Скасовано') ?{color: 'red'}: null}
                  >
                    {e.status}
                  </div>
                </div>

                <a 
                  href={`https://t.me/share/url?url=${`${dataDB.listBot[0].linkShop}?start=${e.idProduct}^${dataDB.listBot[0].nameShop}&text=${`Ось моє замовлення`}`}`}  
                  className="orders__header--blockimg"
                >
                  <div className="orders__header--deleteIcon"></div>
                </a> 
              </div>
              
              <div className="orders__infoProduct">
                <div className='orders__infoProduct--imgBlock'>
                   <img 
                      src={images[0]} 
                      alt='Нема фото' 
                      className='orders__infoProduct--image'
                    />
                </div>

                <div  className="orders__infoProduct--titleBlock" >
                  <Link 
                    to={`/Product/${e.idProduct}?${dataDB.listBot[0].nameShop}`}  
                    className="orders__infoProduct--title"
                    >
                      {e.title}
                  </Link>
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
                (e.telegram !== 'undefined')? 
                <>
                  <hr className='orders__line' />

                  <div className="orders__userPhone">
                    <div className="orders__userPhone--text subtitle">
                      Telegram одержувача
                    </div>

                    <div className="orders__userPhone--value">
                      <a href={`https://t.me/${e.telegram}`}>
                        https://t.me/{e.telegram}
                      </a>
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
                      <a href={e.insta} >
                        {e.insta}
                      </a>
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