// Libreries
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
// Icons svg
import Envelope from "../icons-svg/Envelope";
import EyeClosed from "../icons-svg/EyeClosed";
import EyeOpen from "../icons-svg/EyeOpen";
import UserIcon from "../icons-svg/UserIcon";
// Import hooks
import useAuth from "../../hooks/useAuth";
import Notification from "../utilies/Notification";

const FormRegister = () => {
  // Loader 
  const [loading, setLoading] = useState(false);
  // Import hooks
  const { EMAIL_REGEX, PASSWORD_REGEX, registerUser} = useAuth();
  // Create a notification
  const [notification, setNotification]= useState({})
  // State to switch password type
  const [viewPassword, setViewPassword] = useState(false);
  // UseState for inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');

  // Function submit form
  const handleSubmit = async e => {
    e.preventDefault();
    // Validate all inpust are fill
    if ([ username, email, password, matchPassword ].includes('')) {
        setNotification({
            msg: 'Debe llenar todos los campos',
            isError: true
        });
        return;
    }
    // Validate email
    if (!EMAIL_REGEX.test(email)) {
        setNotification({
            msg: 'Debe ingresar un email válido',
            isError: true
        });
        return;
    }
    // Validate password
    if (!PASSWORD_REGEX.test(password)) {
        setNotification({
            msg: 'La contraseña debe contener 1 mayúscula, 2 minúsculas y mínimo 8 caracteres',
            isError: true
        });
        return;
    }
    // Validate matchs passwords
    if(password !== matchPassword){
        setNotification({
            msg: 'Ambas contraseñas deben coincidir',
            isError: true
        });
        return;
    }
    setNotification({});
    setLoading(true);
    const newUser = await registerUser({ username, email, password });
    setLoading(false);
    setNotification({
      msg: newUser.msg,
      isError: newUser.isError
    });


    setTimeout(() => setNotification({}), 5000);
    setUsername('');
    setEmail('');
    setPassword('');
    setMatchPassword('');
  } 

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className="w-4/5 max-w-4xl overflow-auto bg-zinc-800  flex flex-col gap-6 px-6 py-8 rounded-lg text-zinc-100 shadow-lg">
        <h3 className="capitalize font-bold text-3xl text-center">
          Registrarse
        </h3>
        <div className="flex flex-col md:flex-row  items-stretch gap-8">
          {/* Primera section */}
          <div className="flex flex-col gap-4 w-full md:w-2/4">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bol">Usuario:</p>
              <label
                htmlFor="username"
                className="flex items-center gap-4 border p-2 rounded-lg"
              >
                <div>
                  <UserIcon />
                </div>
                <input
                  className="py-1 flex flex-grow bg-transparent outline-none text-lg overflow-auto"
                  id="username"
                  type="text"
                  placeholder="Ingresa un nombre de usuario"
                  
                  autoFocus
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </label>
            </div>
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
                  
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
            </div>
          </div>
          {/* Otra section */}
          <div className="flex flex-col gap-4  w-full md:w-2/4">
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
            {/* Match Password */}
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bol">Repetir Contraseña:</p>
              <label
                htmlFor="match-password"
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
                  id="match-password"
                  type={viewPassword ? "text" : "password"}
                  placeholder="Repite contraseña"
                  
                  value={matchPassword}
                  onChange={e => setMatchPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        {/* Options */}
        <div className="flex flex-col gap-2  md:gap-6 md:flex-row items-center justify-center">
          <Link
            className="text-zinc-300 hover:text-indigo-700 hover:scale-110 transition-all ease-in-out duration-500"
            to={"/"}
          >
            ¿Ya tienes cuenta? Inicia Sesión.
          </Link>
        </div>
        {/* Notification */}
        { notification.msg && <Notification notification={notification} />}
        {/* Loader */}
        <div className={`${loading ? 'flex' : 'hidden'} justify-center items-center w-full`}>
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

        {/* Submit */}
        <input
          type="submit"
          className="capitalize w-full max-w-xs mx-auto bg-indigo-700 px-4 py-2 rounded-lg text-lg font-bold hover:opacity-80 hover:scale-y-110 transition-all ease-in-out duration-700 cursor-pointer"
          value={"Enviar"}
        />
      </form>
    </>
  );
};

export default FormRegister;
