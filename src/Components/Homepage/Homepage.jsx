import { useContext } from "react"
import { ReactContext } from "../../context/reactContext"

export const Homepage = ({
  onClose,
  dataDB
}) =>{

  const tg = useContext(ReactContext)

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