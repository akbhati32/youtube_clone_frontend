import { Link } from "react-router-dom";

// NotFound Component → shown when user visits an invalid/non-existent route
export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center animate-fadeIn">

      <h2 className="text-3xl font-semibold mb-4 text-gray-900 tracking-wide">
        Oops! Page Not Found
      </h2>

      <p className="max-w-xl text-gray-700 text-lg leading-relaxed mb-10 px-4 sm:px-0">
        The page you’re looking for doesn’t exist, may have been moved, or is temporarily unavailable.  
        Please check the URL or return to the homepage.
      </p>

      <Link
        to="/"
        className="btn1"
      >
        Go to Home
      </Link>
    </div>
  );
}