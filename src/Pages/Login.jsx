import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { validateLoginForm } from "../utils/loginValidation";
import useTitle from "../hooks/useTitle";
import ActionButton from "../Components/ActionButton";
const logoURL =
  "https://res.cloudinary.com/dy0av590l/image/upload/v1727663361/logo_pez8p2.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
    general: false,
  });

  const { loading, login } = useAuth();

  useTitle("Log in");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError({ email: false, password: false, general: "" });
    const { isValid, errors } = validateLoginForm(email, password);

    if (!isValid) return setError((prev) => ({ ...prev, ...errors }));
    const credentials = { email, password };

    const result = await login(credentials);

    if (result.success) {
      return navigate("/home", { replace: true });
    } else {
      setError((prev) => ({
        ...prev,
        general: result.error || "Failed to log in. Please try again.",
      }));
    }
  }

  async function handleDemoLogin() {
    const accounts = [
      "JohnDoe@example.com",
      "test@example2.com",
      "bob@ross.com",
    ];

    const randomEmail = accounts[Math.floor(Math.random() * accounts.length)];

    console.log(randomEmail);
    setEmail(randomEmail);
    setPassword("12345678");

    const credentials = { email: randomEmail, password: "12345678" };
    const result = await login(credentials);

    if (result.success) {
      return navigate("/home", { replace: true });
    } else {
      setError((prev) => ({
        ...prev,
        general: result.error || "Failed to log in. Please try again.",
      }));
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen flex-col sm:flex-row bg-black px-4 sm:px-0 py-8  sm:py-0">
      <div className="sm:mr-20 ">
        <img src={logoURL} alt="X logo" className="sm:w-[600px] w-48 h-auto" />
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-white  sm:text-7xl  text-5xl  font-bold w-full text-nowrap mb-10">
          Happening now
        </h1>
        <h3 className="text-white  text-3xl font-bold w-full text-nowrap mb-4">
          Join today.
        </h3>

        <form
          onSubmit={handleSubmit}
          className="bg-black text-white w-full  rounded sm:pr-10 pt-6 pb-8 mb-4"
        >
          <div className="mb-4 ">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
            {error.email && (
              <p className="text-red-500 text-xs italic mt-1">Invalid Email</p>
            )}
          </div>
          <div className="">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
            />
            {error.password && (
              <p className="text-red-500 text-xs mb-2 italic">
                Password must be at least 6 characters
              </p>
            )}
          </div>
          {error.general && (
            <div className="text-red-500 text-sm mb-4">{error.general}</div>
          )}
          <div className="flex flex-col items-center justify-between">
            <ActionButton
              loading={loading}
              loadingText={"Logging in..."}
              idleText={"Log in"}
            />
          </div>{" "}
          <div className="flex flex-col items-center justify-between">
            <button
              type="button"
              className={`w-full mt-3 bg-blue-bookmark hover:bg-blue-600 text-white p-2 rounded transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed `}
              disabled={loading}
              onClick={handleDemoLogin}
            >
              {loading
                ? "Loggin in as random user..."
                : "Try Demo (Random Account)"}
            </button>
          </div>{" "}
          <div className="mt-2 text-center">
            No account?{" "}
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-bookmark hover:text-blue-500"
              to="/sign-up"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
