import { Outlet } from "react-router-dom"
import NavbarPrincipal from "../../components/navbars/NavbarPrincipal"

const AuthLayout = () => {
  return (
    <>
        <header className="relative w-full h-20 text-zinc-100">
          <NavbarPrincipal/>
        </header>
        <section className="w-full py-8 h-100 flex justify-center items-center">
          <Outlet/>
        </section>


    </>
  )
}

export default AuthLayout