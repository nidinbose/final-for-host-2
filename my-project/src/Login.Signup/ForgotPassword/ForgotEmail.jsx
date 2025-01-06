import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import axios from "axios";

const RequestOtp = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const validateEmail = () => {
    let formErrors = {};
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email address";
    }
    return formErrors;
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateEmail();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:3003/api/fpwd", {
        email: formData.email,
      });

      setEmailSent(true);
      setSuccessMessage("OTP has been sent to your email.");

      setTimeout(() => {
        navigate("/resetpassword");
      }, 2000); 
    } catch (error) {
      setErrors({ submit: error.response?.data?.error || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid h-screen place-items-center p-8 bg-white">
      <div className="max-w-[24rem] mx-auto">
        <Typography variant="h3" color="blue-gray" className="mb-2 text-center font-semibold">
         Forgot Password
        </Typography>
        <Typography className="mb-16 text-center text-gray-600 font-normal text-[18px]">
          Enter your email to receive an OTP for resetting your password.
        </Typography>

        {errors.submit && (
          <Typography variant="small" className="mb-4 text-red-600 text-center">
            {errors.submit}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="small" className="mb-4 text-green-600 text-center">
            {successMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Email
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full placeholder:opacity-100 focus:border-primary border-blue-gray-200"
              type="email"
              error={Boolean(errors.email)}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.email}
              </Typography>
            )}
          </div>

          <Button type="submit" color="" size="lg" className="mt-6 h-12 bg-gray-800" fullWidth disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default RequestOtp;
