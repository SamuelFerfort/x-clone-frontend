import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import ActionButton from "../Components/ActionButton";

const logoURL =
  "https://res.cloudinary.com/dy0av590l/image/upload/v1727663361/logo_pez8p2.jpg";
export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    handler: "",
  });

  const [errors, setErrors] = useState({});

  const { register, loading, login } = useAuth();
  useTitle("Sign Up");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.handler.trim()) newErrors.handler = "Handler is required";

    if (!formData.handler.startsWith("@"))
      newErrors.handler = "Handler has to start with '@'";

    if (!formData.email.includes("@"))
      newErrors.email = "Invalid email address";
    if (formData.password.length < 8)
      newErrors.password = "Password length must be at least 8 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { success, error } = await register(formData);
    if (success) {
      login({ email: formData.email, password: formData.password });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error,
      }));
    }
  };
  return (
    <main className="flex flex-col justify-center items-center sm:flex-row bg-black  min-h-screen   px-4 sm:px-0 py-8  sm:py-0 ">
      <div className="sm:mr-20">
        <img src={logoURL} alt="X logo" className="sm:w-[600px] w-48  h-auto" />
      </div>

      <div className="w-full sm:max-w-md ">
        <h1 className="text-white text-5xl  sm:text-7xl font-bold w-full text-nowrap mb-10">
          Happening now
        </h1>
        <h3 className="text-white  text-3xl font-bold w-full text-nowrap mb-4">
          Join today.
        </h3>
        <form
          className=" text-white bg-black  sm:pr-10 pt-6 pb-8 mb-4 sm:max-w-md w-full"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex gap-10">
            <div className="w-1/2">
              <label htmlFor="handler" className="block font-bold text-sm mb-2">
                Handler
              </label>
              <input
                type="text"
                name="handler"
                id="handler"
                placeholder="@Bob"
                onChange={handleChange}
                value={formData.handler}
                className="shadow appearance-none border rounded w-full py-2 sm:px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.handler && (
                <span className="text-red-500 text-xs mb-2 italic">
                  {errors.handler}
                </span>
              )}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="username"
                className="block font-bold text-sm mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Bob Ross"
                onChange={handleChange}
                value={formData.username}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.username && (
                <span className="text-red-500 text-xs mb-2 italic">
                  {errors.username}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-bold text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="bob@ross.com"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mb-2 italic">
                {errors.email}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-bold text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="**************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <span className="text-red-500 text-xs mb-2 italic">
                {errors.password}
              </span>
            )}
          </div>

          {errors.general && (
            <div className="text-red-500 text-xs mb-2 italic ">
              {errors.general}
            </div>
          )}

          <div>
            <ActionButton
              loading={loading}
              loadingText={"Creating account..."}
              idleText={"Sign up"}
            />
          </div>

          <p className="mt-2 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-sm  text-blue-bookmark hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
