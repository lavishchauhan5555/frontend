// src/components/Login.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {images} from '../assets/images' 
import { Link } from "react-router-dom";
import api from '../api/axios'

// Define Yup schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

type FormData = yup.InferType<typeof schema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className=" flex mt-[75px]">
      {/* Left Form Section */}
      <div className="flex-1 flex flex-col justify-center items-start px-16 bg-white">
        <h1 className="text-4xl font-bold mb-2">Welcome back !</h1>
        <p className="text-gray-500 mb-8">
          Enter to get unlimited access to data & information.
        </p>
        <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your mail address"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-2">
            <label className="block mb-2 font-medium" htmlFor="password">
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
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
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between items-center mb-6 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              Remember me
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Forgot your password ?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition"
          >
            Log In
          </button>

          <div className="my-4 text-center text-gray-400">Or, Login with</div>

          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <p className="mt-4 text-center text-gray-500">
            Don’t have an account ?{" "}
            {/* <a href="#" className="text-purple-600 hover:underline">
              Register here
            </a> */}
        <Link to="/Signup" className="text-purple-600 hover:underline">Register here</Link>
          </p>
        </form>
      </div>

      {/* Right Image/Graphics Section */}
      <div
        className="flex-1 bg-cover bg-center "
        // style={{
        //   backgroundImage: 'url("/mnt/data/d6b250b4-14a9-4eea-9d31-963ac646bec8.png")',
        // }}
        
      >
        <img src={images.login} alt="Logo"  className="h-[90vh]"/>
      </div>
    </div>
  );
};

export default Login;
