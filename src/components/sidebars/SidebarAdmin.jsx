import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../buttons/LogoutButton";

const SidebarAdmin = () => {
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
              <Link to={'/admin'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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
                to={"/admin/menu"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-tools-kitchen-2"
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
                  <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3"></path>
                </svg>
                <span className="ml-3">Menu</span>
              </Link>
            </li>
            {/* Tables */}
            <li>
              <Link
                to={"/admin/tables"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-brand-airtable"
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
                  <path d="M3 10v8l7 -3v-2.6z"></path>
                  <path d="M3 6l9 3l9 -3l-9 -3z"></path>
                  <path d="M14 12.3v8.7l7 -3v-8z"></path>
                </svg>
                <span className="ml-3">Mesas</span>
              </Link>
            </li>
            {/* Usuarios */}
            <li>
              <Link
                to={"/admin/users"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className= "icon icon-tabler icon-tabler-user-circle"
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
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                </svg>
                <span className="ml-3">Usuarios</span>
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

export default SidebarAdmin;
