import { ThreeDots } from "react-loader-spinner";

const ScreenLoader = ({ loading }) => {
  return (
    <>
        <div className="fixed w-full h-full flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-zinc-100">
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
    </>
  )
}

export default ScreenLoader