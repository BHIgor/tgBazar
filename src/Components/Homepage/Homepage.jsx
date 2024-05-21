import { useContext } from "react"
import { ReactContext } from "../../context/reactContext"
import { useParams } from "react-router-dom";

const tg = window.Telegram.WebApp;

export const Homepage = () =>{
  const dataDB = useContext(ReactContext)
  const { shopName } = useParams();
  tg.ready()
  console.log(shopName)
  const onClose = () => {
    tg.close();
  }
  return <>
     word
      <button onClick={onClose}>Закрить</button>
      {tg.initDataUnsafe?.user?.username}
      {tg.initDataUnsafe?.user?.id}
      {dataDB.map(e => {
        return (
          <div key={e.id}>
            {e.name}
          </div>
        )
      })
    }
  </>
}