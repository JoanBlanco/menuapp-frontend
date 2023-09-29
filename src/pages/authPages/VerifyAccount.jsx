// Import hooks and libraries
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// Notification component
import Notification from "../../components/utilies/Notification";
// Axios
import clientAxios from '../../config/axios';

const VerifyAccount = () => {
  const [verify, setVerify] = useState(false);
  // Loader 
  const [loading, setLoading] = useState(true);
  // Create a notification
  const [notification, setNotification] = useState({});
  const params = useParams();
  const { id } = params;

  // Get token 
  useEffect(()  => {
    // Function to get token or id and verify account
    const verifyingAccount = async () =>{
      try {
        const {data} = await clientAxios(`/admin/verify/${id}`);
        setVerify(true);
        console.log(data);
        setNotification( { msg: data.msg, isError: false} )
      } catch (error) {
        console.log(error);
        setNotification( { msg: error.response.data.msg, isError: true} )
      }
      setLoading(false)
    }
    verifyingAccount();
  
  }, [id]);
  if (loading) {
    return 'Verificando...'
  }
  return (
    <div className="flex flex-col gap-4 text-zinc-100 bg-zinc-800 p-4 rounded-lg shadow-lg justify-center items-center w-4/5 max-w-xl ">
    {/* Message verification */}
      
      { !loading ? <Notification notification={notification} /> : <p>Verificando...</p>}

      {/* Set link verify */}
      {verify &&  
      (
        <>
        <Link
          className="text-zinc-300  hover:text-indigo-700 hover:scale-110 transition-all ease-in-out duration-500"
          to={"/login"}
        >
          Iniciar Sesión. Presiona aquí
        </Link>
        </>
    
      )}
    </div>
  );
};

export default VerifyAccount;
