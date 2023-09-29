
import useAuth from '../../hooks/useAuth'

const LogoutButton = () => {
  const { closeSession } = useAuth();
  return (
    <>
        <button onClick={() => closeSession()} type='button' className='bg-indigo-700 px-4 py-2 text-zinc-100 rounded-lg w-full text-center font-bold hover:opacity-80 transition-all ease-in-out duration-500'>
            Cerrar Sesión
        </button>
    </>
  )
}

export default LogoutButton