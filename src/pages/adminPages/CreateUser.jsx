import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Notification from "../../components/utilies/Notification";
import CloseX from "../../components/icons-svg/CloseX";
import EyeClosed from "../../components/icons-svg/EyeClosed";
import EyeOpen from "../../components/icons-svg/EyeOpen";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

const CreateUser = () => {
  // Hooks
  const { EMAIL_REGEX, PASSWORD_REGEX } = useAuth();
  const { rols, addUser, user, setUser } = useUser();
  // Notification
  const [notification, setNotification] = useState({});
  // Button boolean password
  const [viewPassword, setViewPassword] = useState(false);
  // Loading
  const [loading, setLoading] = useState(false);
  // Use State inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameRol, setNameRol] = useState("");

  const { _id } = user;

  // UseEffect
  useEffect(() => {
    const objectKey = Object.keys(user);
    objectKey.forEach((key) => {
      if (key === "username") {
        setUsername(user.username);
      }
      if (key === "email") {
        setEmail(user.email);
      }
      if (key === "rol") {
        setNameRol(user.rol.nameRol);
      }
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!_id) {
      // Validate all inpust are fill
      if ([username, email, password, nameRol].includes("")) {
        setNotification({
          msg: "Debe llenar todos los campos",
          isError: true,
        });
        return;
      }
    } else {
        // Validate all inpust are fill
      if ([ username, email, nameRol ].includes('')) {
        setNotification({
            msg: 'Debe llenar todos los campos',
            isError: true
        });
        return;
    }
    }

    // Validate email
    if (!EMAIL_REGEX.test(email)) {
      setNotification({
        msg: "Debe ingresar un email válido",
        isError: true,
      });
      return;
    }

    if (!_id) {
            // Validate password
        if (!PASSWORD_REGEX.test(password)) {
      setNotification({
        msg: "La contraseña debe contener 1 mayúscula, 2 minúsculas y mínimo 8 caracteres",
        isError: true,
      });
      return;
    }
    }

    setNotification({});
    setLoading(true);
    const msgUser = await addUser({ username, email, password, nameRol, _id });
    setLoading(false);
    setNotification({
      msg: msgUser.msg,
      isError: msgUser.isError,
    });
    setTimeout(() => setNotification({}), 3000);

    setUsername('');
    setEmail('');
    setPassword('');
    setNameRol('');
  };

  return (
    <>
      <div className="w-full flex flex-col p-8 gap-10">
        <nav className="w-full p-4 flex justify-end items-center">
          <Link
            onClick={() => setUser({})}
            className="px-4 py-2 text-lg bg-red-700 font-bold text-center text-zinc-100 rounded-lg max-w-xs hover:opacity-80 transition-all ease-in-out  duration-500"
            to={"/admin/users"}
          >
            {<CloseX />}
          </Link>
        </nav>
        {/* Form */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full max-w-lg bg-zinc-800 m-auto flex flex-col items-center gap-4 p-6 rounded-lg text-zinc-100"
        >
          <h3 className="text-3xl font-bold">
            {_id ? "Editar Usuario" : "Crear Usuario"}
          </h3>
          {/* Username */}
          <div className="flex flex-col gap-2 w-full">
            <label className="w-full" htmlFor="username">
              Usuario
            </label>
            <input
              className="w-full p-2 rounded-lg bg-transparent border-2 outline-0"
              type="text"
              id="username"
              placeholder="Ejm: Mesonero 1, Caja, Cocina"
              autoComplete="off"
              autoFocus={true}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-2 w-full">
            <label className="w-full" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 rounded-lg bg-transparent border-2 outline-0"
              type="email"
              id="email"
              placeholder="Ejm: correo@correo.com"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Rols */}
          <div className="flex flex-col gap-2 w-full">
            <label className="w-full" htmlFor="category">
              Rol
            </label>
            <select
              className="w-full p-2 rounded-lg bg-transparent border-2 outline-0"
              type="text"
              id="category"
              value={nameRol}
              onChange={(e) => setNameRol(e.target.value)}
            >
              <option className="text-zinc-800 outline-0" disabled value="">
                Selecciona un rol
              </option>

              {rols.length &&
                rols.map((rol) => {
                  return (
                    <>
                      <option
                        key={rol._id}
                        className="text-zinc-800 bg-transparent"
                        value={rol.nameRol}
                      >
                        {rol.nameRol}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          {/* Password */}
          {!_id && (
            <div className="flex flex-col gap-2 w-full">
              <label className="w-full" htmlFor="password">
                Contraseña
              </label>
              <div className="flex items-center gap-4 border p-2 rounded-lg">
                <button
                  className="hover:text-indigo-700 hover:scale-110 transition-all duration-500 ease-in-out"
                  type="button"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  {viewPassword ? <EyeClosed /> : <EyeOpen />}
                </button>
                <input
                  className="w-full rounded-lg bg-transparent outline-0"
                  id="password"
                  type={viewPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* {_id && (
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="available">Disponibilidad</label>
            <select onChange={(e) => setAvailable(e.target.value)}  value={available} className="cursor-pointer w-full p-2 rounded-lg bg-transparent border-2">
              <option
                className="text-zinc-800 font-bold"
                value=""
                disabled
              >
                Seleccionar una opción
              </option>
              <option className="text-zinc-800 font-bold" value={true}>
                Disponible
              </option>
              <option className="text-zinc-800 font-bold" value={false}>
                No Disponible
              </option>
            </select>
          </div> */}

          {notification.msg && <Notification notification={notification} />}
          {/* Loader */}
          <div
            className={`${
              loading ? "flex" : "hidden"
            } justify-center items-center w-full`}
          >
            <ThreeDots
              height="70"
              width="70"
              radius="9"
              color="#4338ca"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={loading}
            />
          </div>
          <input
            type="submit"
            className="capitalize w-full bg-indigo-700 px-4 py-2 rounded-lg text-lg font-bold hover:opacity-80 hover:scale-y-110 transition-all ease-in-out duration-700 cursor-pointer"
            value={_id ? "Editar" : "Crear"}
          />
        </form>
      </div>
    </>
  );
};

export default CreateUser;
