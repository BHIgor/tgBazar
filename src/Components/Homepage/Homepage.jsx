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
     word
    <button onClick={onClose}>Закрить</button>
    {tg.initDataUnsafe?.user?.username}
    {tg.initDataUnsafe?.user?.id}
  
  </>
}