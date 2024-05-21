import { useContext } from "react"
import { ReactContext } from "../../context/reactContext"

export const Homepage = () =>{

  const tg = window.Telegram.WebApp;
  const dataDB = useContext(ReactContext)
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