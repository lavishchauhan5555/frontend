// src/components/Signup.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { images } from "../assets/images";
import { Link } from "react-router-dom";

// Validation schema
const schema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
   terms: yup
    .boolean()
    .oneOf([true], "You must agree to terms")
    .required(),
});

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};


const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP states
  const [otpPopup, setOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const[username,setusername]=useState("");
  const[password,setpassword]=useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // ---------------------------
  // SIGNUP + SEND OTP API
  // ---------------------------
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      // 1️⃣ Signup API
      const res = await axios.post("http://localhost:3000/Auth/signup", {
        username: data.fullName,
        email: data.email,
        password: data.password,
      });

      console.log("Signup Success:", res.data);

      setUserEmail(data.email); // Save email for OTP
      setusername(data.fullName)
      setpassword(data.password)
      setOtpPopup(true); // Open OTP popup
     

      alert("Signup successful! OTP sent to your email.");
       reset();

    } catch (error: any) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
      reset();
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // VERIFY OTP API
  // ---------------------------
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/Auth/otp", {
        email: userEmail,
        username:username,
        otp: otp,
        password:password,
      });

      alert("OTP Verified Successfully!");
      setOtpPopup(false);

    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid OTP!");
    }
  };

  return (
    <div className="flex mt-[75px]">
      {/* Left Form Section */}
      <div className="flex-1 flex flex-col justify-center items-start px-16 bg-white">
        <h1 className="text-4xl font-bold mb-2">Create your account</h1>
        <p className="text-gray-500 mb-8">Join us to unlock full access to data & insights.</p>

        <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full border rounded px-4 py-2 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              {...register("fullName")}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full border rounded px-4 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`w-full border rounded px-4 py-2 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Confirm Password *</label>
            <input
              type="password"
              placeholder="Re-enter password"
              className={`w-full border rounded px-4 py-2 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 mb-6">
            <input type="checkbox" {...register("terms")} className="w-4 h-4" />
            <label className="text-sm text-gray-600">
              I agree to the <Link to="/terms" className="text-purple-600">terms & conditions</Link>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm mb-4">{errors.terms.message}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Social Login */}
          <div className="my-4 text-center text-gray-400">Or, Sign up with</div>
          <button className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2">
            <img
              src={images.googal}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="cursor-pointer"> Sign up with Google</span>
           
          </button>

          {/* Redirect */}
          <p className="mt-4 text-center text-gray-500">
            Already have an account? <Link to="/Login" className="text-purple-600">Login here</Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="flex-1">
        <img src={images.login} className="h-[101vh] w-full object-cover" />
      </div>

      {/* OTP POPUP */}
      {otpPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg shadow-gray-500/75 p-8 w-[460px]">
            <h2 className="text-xl font-semibold mb-4 text-center">Verify OTP</h2>

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Verify OTP
            </button>

            <button
              onClick={() => setOtpPopup(false)}
              className="w-full bg-gray-300 text-black py-2 rounded mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
