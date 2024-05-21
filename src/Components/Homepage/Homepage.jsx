import { useContext } from "react"
import { ReactContext } from "../../context/ReactContext"
import { useSearchParams } from "react-router-dom";

const tg = window.Telegram.WebApp;

export const Homepage = () =>{
  const dataDB = useContext(ReactContext);
  const searchParams = useSearchParams();
  tg.ready()
  console.log(searchParams)
  console.log(searchParams.get('name'))
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