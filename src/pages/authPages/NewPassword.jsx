import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
// SVG ICONS
import EyeClosed from "../../components/icons-svg/EyeClosed";
import EyeOpen from "../../components/icons-svg/EyeOpen";
import Notification from "../../components/utilies/Notification";
import clientAxios from "../../config/axios";
import { ThreeDots } from "react-loader-spinner";

const NewPassword = () => {
  const { PASSWORD_REGEX, changePassword } = useAuth();
  // State to switch password type
  const [viewPassword, setViewPassword] = useState(false);
  // UseState input password
  const [password, setPassword] = useState("");
  // Notification
  const [notification, setNotification] = useState({});
  // UseState verify
  const [tokenValid, setTokenValid] = useState(false);
  // Loader
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await clientAxios(`/admin/forgot-password/${token}`);
        setTokenValid(true);
        setNotification({ msg: "Ingresa tu nueva contraseña" });
      } catch (error) {
        console.log(error);
        alert("Hubo un error en el enlace");
      }
    };
    verifyToken();
  }, []);

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setNotification({
        msg: "¡Debe ingresar una contraseña!",
        isError: true,
      });
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setNotification({
        msg: "La contraseña debe contener 1 mayúscula, 2 minúsculas y mínimo 8 caracteres",
        isError: true,
      });
      return;
    }
    setNotification({});
    setLoading(true);
    const recovePassword = await changePassword({ password, token });
    setLoading(false);
    setNotification({
      msg: recovePassword.msg,
      isError: recovePassword.isError,
    });
    setTimeout(() => setNotification({}), 5000);
    setPassword("");
  };
  return (
    <>
      {tokenValid && (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-4/5 max-w-lg max-h-[32rem] overflow-auto bg-zinc-800  flex flex-col gap-6 px-6 py-8 rounded-lg text-zinc-100 shadow-lg"
        >
          <h3 className="capitalize font-bold text-3xl text-center">
            Reestablecer tu contraseña
          </h3>
          {notification.msg && <Notification notification={notification} />}
          {/* Email */}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bol">Contraseña nueva:</p>
            <label
              htmlFor="email"
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
                id="email"
                type={viewPassword ? "text" : "password"}
                placeholder="Ingresa tu nueva contraseña"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {/* Link */}
            <Link
              className="text-zinc-300 text-center mt-4 hover:text-indigo-700 hover:scale-110 transition-all ease-in-out duration-500"
              to={"/login"}
            >
              Inicia sesión ahora
            </Link>

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
          </div>
          {/* Submit */}
          <input
            type="submit"
            className="capitalize w-full bg-indigo-700 px-4 py-2 rounded-lg text-lg font-bold hover:opacity-80 hover:scale-y-110 transition-all ease-in-out duration-700 cursor-pointer"
            value={"Guardar nueva contraseña"}
          />
        </form>
      )}
    </>
  );
};

export default NewPassword;
