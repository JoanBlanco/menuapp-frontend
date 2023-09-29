import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../buttons/LogoutButton";
const SidebarKitchen = () => {
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

export default SidebarKitchen;
