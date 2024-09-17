import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! Page not found</p>
      <div className="max-w-md text-center mb-8">
        <p className="text-gray-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <Link
        to="/home"
        className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
      >
        <Home className="mr-2" size={18} />
        Go back home
      </Link>
    </main>
  );
}
