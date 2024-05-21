import { useContext } from "react"
import { ReactContext } from "../../context/ReactContext"

const tg = window.Telegram.WebApp;

export const Homepage = () =>{
  const { products, users} = useContext(ReactContext)

  tg.ready()

  console.log(products)

  console.log(users)
  const onClose = () => {
    tg.close();
  }
  return <>
     word
    <button onClick={onClose}>Закрить</button>
    {tg.initDataUnsafe?.user?.username}
    {tg.initDataUnsafe?.user?.id}
    {products.map(e => {
      return (
        <div key={e.id}>
          {e.name}
        </div>
      )
    })
    }
    {users.map(e => {
      return (
        <div key={e.id}>
          {e.name} lox
        </div>
      )
    })
    }
  </>
}