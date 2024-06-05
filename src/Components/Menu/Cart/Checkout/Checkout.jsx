import { useContext, useState } from 'react';
import { ReactContext } from '../../../../context/ReactContext';
import { animateScroll as scroll } from 'react-scroll';


import './Checkout.scss'
import { Link } from 'react-router-dom';

export const Checkout = () =>{
  const { dataDB } = useContext(ReactContext);
  const [ status, setStatus ] = useState('contact')
  const [cities, setCities] = useState([]);
  const [statusSearch, setStatusSearch] = useState(false)
  const [branches, setBranches] = useState();
  const [succsess, setSuccsess] = useState(false);

  const [ user, setUser ] = useState({fio: '', phone: ''})
  const [delivery, setDelivery] = useState('nova')
  const [oplata, setOplata] = useState('otriman')
  const [phone, setPhone] = useState(true)
  const [adress, setAdress] = useState('')
  const [coment, setComent] = useState('')

  const [selectedBranch, setSelectedBranch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = async (event) => {
    setSearchTerm(event.target.value)
    setStatusSearch(true)
    try {
      fetch(`https://api.novaposhta.ua/v2.0/json/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelName: 'AddressGeneral',
          calledMethod: 'searchSettlements',
          methodProperties: {
            CityName: event.target.value,
            Limit: 10 // Приклад обмеження кількості результатів
          },
          apiKey: 'dc5d03f14d346f939d8a53c48a0b48a8',
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCities(data?.data[0]?.Addresses);
      });

    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCitySelect = (city, ref) => {
    setSearchTerm(city);
    setStatusSearch(false)

    fetch(`https://api.novaposhta.ua/v2.0/json/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: {
          SettlementRef: ref,
          limit:10
        },
        apiKey: 'dc5d03f14d346f939d8a53c48a0b48a8',
      }),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setBranches(data.data);
    });
  };

  const handleSelectChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleOtherDelivery = (event) => {
    setAdress(event.target.value);
  };

  const handleComent = (event) => {
    setComent(event.target.value);
  };

  const sendOrder = () => {
    setSuccsess(true)
    try{
      fetch(`https://tgbazar.com.ua/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          idAdmin: dataDB.listBot[0].idAdmin, 
          cart: dataDB.cart,
          user: user,
          dostavka: delivery,
          city: searchTerm,
          viddilenya: selectedBranch,
          adress: adress,
          oplata: oplata,
          phone: phone,
          coment: coment,
        })
      })
      .then((response) => {
        return response.json();
      })

    } catch (e) {
      return false;
    }
  }

  const fullPrice = (dataDB.cart) ? dataDB.cart.reduce((accumulator, currentValue) => {
   return accumulator + (((currentValue.price_discount === 0)? currentValue.price : currentValue.price_discount) * currentValue.count);
  }, 0) : 0

  const scrollToTop = () => {
    scroll.scrollToTop({duration:20});
  };


  return <> 
    { (dataDB.length === 0) ? <div>Помилка</div> : <>
      <div id={'top'} className="checkout">
        {
          (succsess) ? 
          <>
            <div className="checkout__succsess">
              <div className="checkout__succsess--text">
                <p>Дякуємо за замовлення</p>
              </div>

              <div className='checkout__succsess--blockIcon'>
               <div className="checkout__succsess--icon"></div>
              </div>
              

              <div className="checkout__succsess--blockButton">
                <Link to={`/?${dataDB.listBot[0].nameShop}`} className="checkout__succsess--button"
                style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}
                onClick={() => scrollToTop()}
                >
                  На головну
                </Link>
              </div>
              
            </div>
          </> : 
        <div className="checkout__container">
          <div className="checkout__title">
            Оформлення замовлення
          </div>
          <div className="checkout__icons">
            <div className={(status === 'contact') ? "checkout__icons--contactsActiv" : "checkout__icons--contacts"}></div>
            <hr className="checkout__icons--line"></hr>
            <div className={(status === 'dostavka') ? "checkout__icons--dostavkaActiv" : "checkout__icons--dostavka"}></div>
            <hr className="checkout__icons--line"></hr>
            <div className={(status === 'oplata') ? "checkout__icons--oplataActiv" : "checkout__icons--oplata"}></div>  
          </div> 
          <div className="checkout__body">
            {(status === 'contact') ? <>
              <div className="checkout__contact">
                <div className="checkout__contact--title">
                  Ваші дані
                </div>
                <input 
                  className="checkout__contact--input" 
                  placeholder={`Прізвище, ім'я, по батькові *`}
                  onChange={(event) => setUser(prevstate => ({
                    ...prevstate,
                    fio: event.target.value
                  }))}
                  defaultValue={user.fio}
                />
                <input 
                  className="checkout__contact--input" 
                  placeholder={`Ваш номер телефону *`}
                  onChange={(event) => setUser(prevstate => ({
                    ...prevstate,
                    phone: event.target.value
                  }))} 
                  defaultValue={user.phone}
                />
              
                <button  
                  className="checkout__contact--next" 
                  style={{backgroundColor: `${dataDB.settings[0].clHeader}`}}
                  onClick={() => setStatus('dostavka')}
                  disabled={(user.fio === '' || user.phone === '')? true:false}
                  >
                  Далі
                </button >
              </div>
            </>:null} 

            {(status === 'dostavka') ? <>
              <div className="checkout__dostavka">
                <div className="checkout__dostavka--flex">
                  <div className="checkout__dostavka--title">
                    Доставка
                  </div>

                  <div 
                    className="checkout__dostavka--back"     
                    style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}
                    onClick={() => setStatus('contact')}
                  >
                    Назад
                  </div>
            
                </div>
               

                <div className="checkout__dostavka--delivery">
                  <div 
                    className="checkout__dostavka--item" 
                    onClick={() => setDelivery('nova')} 
                    style={((delivery === 'nova') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                    }`} :null)} 
                  >
                    Нова пошта
                  </div>

                  <div 
                    className="checkout__dostavka--item" 
                    onClick={() => setDelivery('ukr')} 
                    style={((delivery === 'ukr') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                    }`} :null)} 
                  >
                    Укр пошта
                  </div>

                  <div 
                    className="checkout__dostavka--item" 
                    onClick={() => setDelivery('meest')}
                    style={((delivery === 'meest') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                    }`} :null)}
                  >
                    Meest пошта
                  </div>

                  <div 
                    className="checkout__dostavka--item" 
                    onClick={() => setDelivery('kurier')}
                    style={((delivery === 'kurier') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                    }`} :null)}
                  >
                    Кур'єр
                  </div>

                  <div 
                    className="checkout__dostavka--item" 
                    onClick={() => setDelivery('rozetka')}
                    style={((delivery === 'rozetka') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                    }`} :null)} 
                  >
                    Магазини Rozetka
                  </div>

                  <div 
                    className="checkout__dostavka--item" 
                    onClick={() => setDelivery('sam')}
                    style={((delivery === 'sam') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                    }`} :null)} 
                  >
                    Самовивіз
                  </div>   
                </div>

                <div className="checkout__dostavka--deliveryTitle">
                  { (delivery === 'nova')? 'Нова пошта':
                    (delivery === 'ukr')? 'Укр пошта':
                    (delivery === 'meest')? 'Meest пошта':
                    (delivery === 'kurier')? `Кур'єр`:
                    (delivery === 'rozetka')? 'Магазини Rozetka':
                    (delivery === 'sam')? 'Самовивіз': null
                  }
                </div>
                { (delivery === 'nova')? <>
                  <input 
                    type="text" 
                    className="checkout__contact--input" 
                    placeholder="Введіть назву міста" 
                    value={searchTerm} 
                    onChange={handleInputChange} 
                  />

                  {
                    (statusSearch === true) ? 
                    <ul className='checkout__dostavka--list'>
                      {cities?.map(city => (
                        <li key={city.Ref} onClick={() => handleCitySelect(city.Present, city.Ref)}>
                          {city.Present}
                        </li>
                      ))}
                    </ul>:null
                  }

                  <select  
                    className="checkout__contact--input"
                    style={{cursor:'pointer'}} 
                    value={selectedBranch} 
                    onChange={handleSelectChange}
                  >
                    <option value="">Обрати відділення</option>
                    {branches?.map(branch => (
                      <option key={branch.Ref} value={branch.Description}>
                        {branch.Description}
                      </option>
                    ))}
                  </select>
                  </>:
                    (delivery === 'ukr' || delivery === 'meest' || delivery === 'kurier' || delivery === 'rozetka' || delivery === 'sam')? <>
                    
                      <textarea 
                        className='checkout__dostavka--other'
                        onChange={handleOtherDelivery}
                        placeholder='Введіть місто, адресу або відділення, де бажаєте отримати замовлення'/>
                    </>: null
                  }
                
                <button  
                  className="checkout__contact--next" 
                  style={{backgroundColor: `${dataDB.settings[0].clHeader}`}}
                  onClick={() => setStatus('oplata')}
                  disabled={(adress !== '' || selectedBranch !== '')? false:true}
                  >
                  Далі
                </button >
  
              </div>
            </>:null} 

            {(status === 'oplata') ? <>
              <div className="checkout__oplata">
                <div className="checkout__oplata--flex">
                  <div className="checkout__oplata--title">
                    Оплата
                  </div>

                  <div 
                    className="checkout__oplata--back"     
                    style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}
                    onClick={() => setStatus('dostavka')}
                  >
                    Назад
                  </div>
              </div>

              <div className="checkout__oplata--main">
                <div className="checkout__oplata--mainTitle">
                  Оберіть спосіб оплати:
                </div>
                <div 
                  className="checkout__oplata--item"
                  onClick={() => setOplata('otriman')} 
                  style={((oplata === 'otriman') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                  }`} :null)}
                  >Оплата при отриманні</div>
                <div 
                 className="checkout__oplata--item"
                 onClick={() => setOplata('rekvizit')} 
                 style={((oplata === 'rekvizit') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                 }`} :null)}
                >Перевод по реквізитам</div>
                <div
                  className="checkout__oplata--item"
                  onClick={() => setOplata('karta')} 
                  style={((oplata === 'karta') ? {backgroundColor: `${dataDB.settings[0].clHeader}`, color: `${dataDB.settings[0].clTitle
                  }`} :null)}
                >Перевод на карту</div>

                <div className="checkout__oplata--blockPhone" onClick={() => setPhone((phone) ? false : true)}>
                  <div className="checkout__oplata--kub">
                   {
                    (phone) ? 
                    <div className="checkout__oplata--kub1"   style= {{backgroundColor: `${dataDB.settings[0].clHeader}`}}
                    ></div> :null
                   } 
                  </div>
                  <div className="checkout__oplata--phone">Передзвонити мені</div>
                </div>

                <div className="checkout__oplata--coment">
                  Коментар
                </div>
                  
                <textarea 
                className="checkout__oplata--comentText"
                placeholder='Залиште тут свої побажання'
                value={coment} 
                onChange={handleComent} 
                >
                 
                </textarea>

              </div>
              
              </div>
            </>:null} 
          </div>
           <div className="cart__orderBlock">
            <div className="cart__order"  style={{backgroundColor: `${dataDB.settings[0].clHeader}`}}></div> 
  
            <div className="cart__fullPrice">
              <div className="cart__blockPrice">
                <div className="cart__fullPrice--text">
                  Разом:
                </div>
                <div className="cart__fullPrice--price">
                  {fullPrice}<span className='cart__simvol'>₴</span>
                </div>
              </div>
  
              <button 
              className="cart__orderButton checkout__enter" 
              onClick={() => sendOrder()}
              style={{backgroundColor: `${dataDB.settings[0].clButtonProduct}`}}
              disabled={(user.fio !== '' && user.phone !== '' && (adress !== '' || selectedBranch !== '') )? false : true}
              >
                Замовлення підтверджую
              </button>
            </div>
  
           </div>      
        </div>
        }
      </div>
    </>
    }
  </>
}