import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>

      <h2 className="text-2xl font-semibold mt-4">Oops! Page Not Found</h2>

      <p className="text-gray-600 mt-2 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
