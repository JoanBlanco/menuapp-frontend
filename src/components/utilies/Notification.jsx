const Notification = ({ notification }) => {

  return (
    <div className={`${ notification?.isError ?  'bg-gradient-to-r from-red-500 via-red-600  to-red-700' : 'bg-gradient-to-r from-green-500 via-green-600  to-green-700'} w-full  text-base p-2 rounded-lg shadow-lg text-center font-semibold max-w-2xl text-zinc-100`}>
        { notification?.msg }
    </div>
  )
}

export default Notification