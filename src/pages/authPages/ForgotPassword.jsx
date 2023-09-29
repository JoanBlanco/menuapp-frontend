import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
// Import svg icons
import Envelope from "../../components/icons-svg/Envelope";
// Utilies
import Notification from "../../components/utilies/Notification";

// Import hook
import useAuth from "../../hooks/useAuth";

const ForgotPassword = () => {
  // hooks
  const { EMAIL_REGEX, sendEmailPassword } = useAuth();
  // UseState for input
  const [email, setEmail] = useState("");
  // Notification
  const [notification, setNotification] = useState({});
  // Loader
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs
    if (!email) {
      setNotification({
        msg: "¡El email es obligatorio!",
        isError: true,
      });
      return;
    }
    // REGEX
    if (!EMAIL_REGEX.test(email)) {
      setNotification({
        msg: "¡El email es inválido!",
        isError: true,
      });
      return;
    }

    // Send email
    setNotification({});
    setLoading(true);
    const emailSend = await sendEmailPassword(email);
    setLoading(false);
    setNotification({
      msg: emailSend.msg,
      isError: emailSend.isError,
    });

    setTimeout(() => setNotification({}), 5000);
    setEmail('')
  };
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-4/5 max-w-lg max-h-[32rem] overflow-auto bg-zinc-800  flex flex-col gap-6 px-6 py-8 rounded-lg text-zinc-100 shadow-lg"
      >
        <h3 className="capitalize font-bold text-3xl text-center">
          Olvidé mi contraseña
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
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

export default ForgotPassword;
