import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./Store/AuthSlice";
import { Outlet } from "react-router-dom";
import { Footer, Header } from './Components'

function App() {
  const [Loding, setLoding] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrntuser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ userdata }))
        } else {
          dispatch(logout())
        }

      })
      .finally(() => setLoding(false))
  }, [])

  return !Loding ? (
    <div>
      <Header />
      <main >
        Toodo
        {/* <Outlet /> */}
      </main>

      <Footer />
    </div>
  ) : null
}

export default App
