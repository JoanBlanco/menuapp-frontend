import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../buttons/LogoutButton";
const SidebarWaiter = () => {
  const { activeSidebar } = useAuth();
  return (
    <>
      <aside
        id="logo-sidebar"
        className={`${
          activeSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  border-r border-zinc-100 md:translate-x-0 bg-zinc-80`}
        aria-label="Sidebar"
      >
        <div className="h-full p-6 pb-4 overflow-y-auto  bg-zinc-800">
          <ul className="space-y-2 font-medium flex flex-col gap-4">
            {/* Pedidos */}
            <li>
              <Link
                to={"/user/orders"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-receipt"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2"></path>
                </svg>
                <span className="ml-3">Pedidos</span>
              </Link>
            </li>

            {/* Menu */}
            <li>
              <Link
                to={"/user/create-order"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circle-plus"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                  <path d="M9 12h6"></path>
                  <path d="M12 9v6"></path>
                </svg>
                <span className="ml-3">Crear Pedido</span>
              </Link>
            </li>
            {/* Logout button */}
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SidebarWaiter;
