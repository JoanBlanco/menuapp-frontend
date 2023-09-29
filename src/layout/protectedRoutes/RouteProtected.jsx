import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NavBarAdmin from "../../components/navbars/NavBarAdmin";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import ScreenLoader from "../../components/utilies/ScreenLoader";

const RouteProtected = () => {
  const { auth, loader, userRol, navigate } = useAuth();

  // if (userRol?.nameRol !== 'admin') return navigate('/login');

  if (loader) return <ScreenLoader loading={loader} />;
  return (
    <>
      {auth?._id ? (
        <>
          <header className="relative w-full h-20 text-zinc-100">
            <NavBarAdmin />
          </header>
          <SidebarAdmin />
          <main className="w-100 h-100 flex flex-col items-stretch">
            <Outlet />
          </main>
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default RouteProtected;
