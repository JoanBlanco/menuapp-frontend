import useAuth from "../../hooks/useAuth";
import BurgerBar from "../icons-svg/BurgerBar";
import CloseX from "../icons-svg/CloseX";

const NavBarWaiter = () => {
    const { setActiveSidebar, activeSidebar } = useAuth();
  return (
    <>
      <nav className="fixed flex gap-8 justify-between items-center h-20 z-50 w-full bg-zinc-800 border-b px-10 border-zinc-200 text-zinc-100">
        {/* Container 1 */}
        <div className="flex items-center justify-start gap-4">
          {/* Burger btn */}
          <button
            onClick={() => setActiveSidebar(!activeSidebar)}
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-zinc-100 rounded-lg md:hidden"
          >
            {activeSidebar ? <CloseX /> : <BurgerBar />}
          </button>
          {/* Logo MenuApp */}
          <h1 className="font-bold text-4xl">MenuApp</h1>
        </div>

      </nav>
    </>
  )
}

export default NavBarWaiter