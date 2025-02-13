export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center space-x-4 mb-8">
        <div className="relative w-20 h-20">
          {/* Outer Spinner with Gradient and Glow Effect */}
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin animate-[spin_2s_linear_infinite] shadow-xl ring-2 ring-blue-300"></div>
  
          {/* Inner Spinner with a different color and smooth animation */}
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin animate-[spin_2s_0.5s_linear_infinite] ring-2 ring-green-300"></div>
        </div>
        <span className="text-xl text-gray-700 font-semibold">Loading...</span>
      </div>
    );
  }
  