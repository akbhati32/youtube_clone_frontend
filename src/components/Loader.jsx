
// Loader component (displays a spinning loader animation)
const Loader = () => {

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <div 
        className="w-25 h-25 border-4 border-main border-t-gray-400 rounded-full animate-spin shadow-xl drop-shadow-md mb-4">
      </div>
        <p className="text-xl font-stretch-100% animate-pulse">
          Loading...
        </p>
    </div>
  );
}

export default Loader;