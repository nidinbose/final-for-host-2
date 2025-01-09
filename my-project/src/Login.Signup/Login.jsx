import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", role: "student" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const response = await fetch("http://16.170.206.64/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong");

      const { role, token } = result;
      localStorage.setItem("token", token);
      navigate(role === "admin" ? "/admin" : role === "staff" ? "/staff" : "/students");
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white/10 border flex flex-col lg:flex-row items-center lg:items-start max-w-5xl">
        <div className="w-full lg:w-1/2">
          <img
            src="/images/a.avif"
            alt="Login Illustration"
            className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg w-full h-72 lg:h-full object-cover"
          />
        </div>
        <div className="p-8 w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Welcome Back!</h2>
          <p className="text-gray-500 mb-6">
            Log in with your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="flex justify-between items-center">
              <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-center text-sm mb-4">{errors.submit}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white font-bold py-2 rounded-lg hover:bg-pink-600 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="text-end mt-6">
            <h1>Student email :  student@gmail.com</h1>
            <h2>Student password : ASDasd123#</h2>
          </div>

          <div className="text-end mt-6">
            <h1>Staff email :  staff@gmail.com</h1>
            <h2>Staff password : ASDasd123#</h2>
          </div>

          <div className="text-end mt-6">
            <h1>Admin email :  admincambridge@gmail.com</h1>
            <h2>Admin password : ASDasd123#</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
