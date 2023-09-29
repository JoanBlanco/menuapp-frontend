import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ScreenLoader from "../../components/utilies/ScreenLoader";
import NavBarWaiter from "../../components/navbars/NavBarWaiter";
import SidebarKitchen from "../../components/sidebars/SidebarKitchen";

const KitchenLayout = () => {
  const { auth, loader, userRol } = useAuth();

  // if (userRol?.nameRol !== 'admin') return navigate('/login');

  if (loader) return <ScreenLoader loading={loader} />;
  return (
    <>
      {auth?._id ? (
        userRol.nameRol === "cocina" && (
          <>
            <header className="relative w-full h-20 text-zinc-100">
              <NavBarWaiter/>
            </header>
            <SidebarKitchen/>
            <main className="w-100 h-100 flex flex-col items-stretch">
              <Outlet />
            </main>
          </>
        )
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default KitchenLayout;