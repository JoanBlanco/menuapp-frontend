import { useState } from 'react'
import { Link } from "react-router-dom"
const NavbarPrincipal = () => {

    const [activeNav, setActiveNav] = useState(false);

  return (
    <>
        <nav className="bg-zinc-800 flex justify-between items-center fixed w-full h-20 px-10 text-zinc-100">
            {/* Logo */}
            <div className="flex justify-start items-center">
                <Link to={'/'} className="font-bold text-4xl">MenuApp</Link>
            </div>
            {/* Links */}
            <div className={`${ activeNav ? 'flex fixed h-full w-2/3 md:w-2/4 justify-center' : 'hidden w-0' } bg-zinc-800 flex-col top-20 right-0 p-8 lg:p-0  lg:relative
            lg:top-0 lg:h-0 lg:flex-row lg:flex  lg:w-auto items-center gap-6`}>

                {/* Buttons */}
                <Link onClick={() => setActiveNav(false)} to={'/register'} className="text-lg bg-indigo-900 px-4 py-2 rounded-lg font-bold shadow-lg hover:opacity-80 transition-all ease-in-out duration-700">Registrarse</Link>
                <Link  onClick={() => setActiveNav(false)} to={'/'} className="text-lg bg-indigo-700 px-4 py-2 rounded-lg flex justify-center items-center text-center shadow-lg hover:opacity-80 transition-all ease-in-out duration-700">Iniciar Sesión</Link>
            </div>
            {/* button burger */}
            <div className='flex lg:hidden items-center justify-center'>
                <button type='button' onClick={() => setActiveNav(!activeNav)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                </button>
            </div>
          </nav>          
    </>
  )
}

export default NavbarPrincipal