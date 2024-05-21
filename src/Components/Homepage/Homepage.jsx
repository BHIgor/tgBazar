import { useContext } from "react"
import { ReactContext } from "../../context/ReactContext"

const tg = window.Telegram.WebApp;

export const Homepage = () =>{
  const dataDB = useContext(ReactContext);
  const product = dataDB.products;
  const user = dataDB.users;

  tg.ready()
  console.log(dataDB)
  console.log(product)

  console.log(user)
  const onClose = () => {
    tg.close();
  }
  return <> 
      { (dataDB.length === 0) ? <div>Помилка</div> : <>
      
      word
    <button onClick={onClose}>Закрить</button>
    {tg.initDataUnsafe?.user?.username}
    {tg.initDataUnsafe?.user?.id}
    
    {product.map(e => {
      return (
        <div key={e.id}>
          {e.name}
        </div>
      )
    }) 
    }
     { user.map(e => {
      return (
        <div key={e.id}>
          {e.name}
        </div>
      )
    })
    
    }
    </>
  }
  
  </>
}