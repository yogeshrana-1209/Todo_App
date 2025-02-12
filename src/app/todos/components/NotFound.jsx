
const NotFound = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-sm mx-auto">
          <h2 className="text-4xl font-bold text-red-600">404 - Page Not Found</h2>
          <p className="text-gray-600 mt-4">The page you are looking for does not exist.</p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-block text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default NotFound;
  