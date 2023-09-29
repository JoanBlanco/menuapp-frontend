// Import dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ThreeDots } from "react-loader-spinner";
// Import svg
import Envelope from "../../components/icons-svg/Envelope";
import EyeClosed from "../../components/icons-svg/EyeClosed";
import EyeOpen from "../../components/icons-svg/EyeOpen";
// Components
import Notification from "../../components/utilies/Notification";

// h-[calc(100%-1rem)]
const Login = () => {
    const {loginUser} = useAuth();
  // UseState inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Notification
  const [notification, setNotification] = useState({});
  // Button boolean password
  const [viewPassword, setViewPassword] = useState(false);
    // Loading
    const [loading, setLoading] = useState(false);

  // Function login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([ email, password ].includes('')) {
        setNotification({
            msg: 'Debe llenar todos los campos',
            isError: true
        })
        return;
    }
    setLoading(true)
    const userLogin = await loginUser({ email, password });
    setNotification({
        msg: userLogin.msg,
        isError: userLogin.isError
    })
    setLoading(false)

    setTimeout(() => setNotification({}), 3000);
    setPassword('');
  };

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className="w-4/5 max-w-xl max-h-[35rem] overflow-auto bg-zinc-800  flex flex-col gap-6 px-6 py-8 rounded-lg text-zinc-100 shadow-lg">
        <h3 className="capitalize font-bold text-3xl text-center">
          Inicia Sesión
        </h3>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bol">Email:</p>
          <label
            htmlFor="email"
            className="flex items-center gap-4 border p-2 rounded-lg"
          >
            <div>
              <Envelope color={"zinc-100"} width={"8"} height={"8"} />
            </div>
            <input
              className="py-1 flex flex-grow bg-transparent outline-none text-lg overflow-auto"
              id="email"
              type="email"
              placeholder="Ingresa tu correo electronico"
              autoFocus
              autoComplete="off"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
        </div>
        {/* Password */}
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bol">Contraseña:</p>
          <label
            htmlFor="password"
            className="flex items-center gap-4 border p-2 rounded-lg"
          >
            <button
              className="hover:text-indigo-700 hover:scale-110 transition-all duration-500 ease-in-out"
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? <EyeClosed /> : <EyeOpen />}
            </button>
            <input
              className="py-1 flex flex-grow bg-transparent outline-none text-lg overflow-auto"
              id="password"
              type={viewPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>

        {/* Options */}
        <div className="w-full flex flex-col gap-2  md:gap-6 md:flex-row md:justify-around items-center lg:justify-around">
          <Link
            className="text-zinc-300 text-base hover:text-indigo-700 hover:scale-110 transition-all ease-in-out duration-500"
            to={"/forgot-password"}
          >
            Olvidé contraseña
          </Link>
          <Link
            className=" text-zinc-300 hover:text-indigo-700 hover:scale-110 transition-all ease-in-out duration-500"
            to={"/register"}
          >
            ¿No tienes cuenta? Registrate.
          </Link>
        </div>
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
        {notification.msg && <Notification notification={notification} />}
        {/* Submit */}
        <input
          type="submit"
          className="capitalize w-full bg-indigo-700 px-4 py-2 rounded-lg text-lg font-bold hover:opacity-80 hover:scale-y-110 transition-all ease-in-out duration-700 cursor-pointer"
          value={"Enviar"}
        />
      </form>
    </>
  );
};

export default Login;
