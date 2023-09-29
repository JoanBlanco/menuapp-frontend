import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";

const UserCard = ({ user }) => {
  // Hook
  const { setModalDelete } = useAuth();
  const { setEdition } = useUser();
  const { username, email, rol, available, _id } = user;
  const navigate = useNavigate();
  return (
    <>
      {/* Category card */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-zinc-100  text-zinc-800  border-b-2 py-4">
        <div>
          <p>{username}</p>
        </div>
        <div>
          <p>{email}</p>
        </div>
        <div>
          <p>{rol?.nameRol}</p>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
               setEdition(user);
              navigate("/admin/create-user");
            }}
            className="hover:opacity-80 ease-in-out transition-all hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user-edit text-indigo-700"
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
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
              <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path>
              <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z"></path>
            </svg>
          </button>
          <button
             onClick={() => setModalDelete({ msg: '¿Está seguro de eliminar este usuario?', show: true, _id, type: 'user'})}
            type="button"
            className="hover:opacity-80 ease-in-out transition-all hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user-x text-red-500"
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
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
              <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path>
              <path d="M22 22l-5 -5"></path>
              <path d="M17 22l5 -5"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
