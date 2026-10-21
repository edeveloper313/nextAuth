"use client";
import React, { useEffect, useState } from "react";
import UserSignUpI from "@/interfaces/ui/user.interface";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserSignUpI>({
    userName: "",
    email: "",
    password: "",
  });
  const buttonDisabled =
    user.email.length > 0 &&
    user.userName.length > 0 &&
    user.password.length > 0;
  const [loading, setLoading] = useState(false);
  const onSignUp = async () => {
    try {
      const response = await axios.post("api/users/signup", user);
      if (response.data.flag) {
        router.push("/login");
      }
      return console.log("No SignUp");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);

      toast.error(message);
      throw new Error(`Some errors, please check frontend: ${message}`);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          <div className="lg:flex lg:items-center  lg:-mx-6">
            <div className="mt-8 lg:w-1/2 lg:mx-6">
              <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl shadow-gray-300/50 dark:shadow-black/50">
                <h1 className="text-lg font-medium text-gray-700">
                  {loading ? "Processing" : "SignUp"}
                </h1>

                <form
                  className="mt-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (buttonDisabled) {
                      onSignUp();
                    }
                  }}
                >
                  <div className="flex-1">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Full Name
                    </label>
                    <input
                      id="userName"
                      type="text"
                      value={user.userName}
                      onChange={(e) => {
                        setUser({ ...user, userName: e.target.value });
                      }}
                      placeholder="Type User name...."
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex-1 mt-6">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                      }}
                      placeholder="johndoe@example.com"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex-1 mt-6">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={user.password}
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                      placeholder="Password*****"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <button
                    className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    type={buttonDisabled ? "submit" : "button"}
                  >
                    {buttonDisabled ? `Submit ` : "Fill out the form first."}
                  </button>
                  <Link href="/login">Are you Login? </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
