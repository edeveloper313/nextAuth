"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const logoutFun = async () => {
    try {
      const response = await axios.get("api/users/logout");
      setdata(response.data.message);
      if (response.data.flag) {
        router.push("/login");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message);
    }
  };

  const [data, setData] = useState("");
  const getProfileDataFun = async () => {
    const res = await axios.post("/api/users/profile");
    setData(res.data.user._id);
  };
  return (
    <>
      {" "}
      <header className="bg-white dark:bg-gray-900">
        <nav className="relative bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 py-4 md:flex md:items-center md:justify-between">
            {/* Logo and Mobile Toggle */}
            <div className="flex items-center justify-between">
              <a href="#" aria-label="Home">
                <img
                  className="h-6 w-auto sm:h-7"
                  src="https://merakiui.com/images/full-logo.svg"
                  alt="Logo"
                />
              </a>

              <div className="flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400"
                  aria-label="Toggle menu"
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <div
              className={`absolute inset-x-0 top-full z-20 w-full bg-white px-6 py-4 transition-all duration-300 ease-in-out dark:bg-gray-900 md:static md:mt-0 md:flex md:w-auto md:items-center md:bg-transparent md:p-0 md:opacity-100 dark:md:bg-transparent ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0 md:translate-x-0"
              }`}
            >
              <div className="flex flex-col md:mx-6 md:flex-row">
                {["Home", "Shop", "Contact", "About"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="my-2 text-gray-700 transition-colors duration-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 md:mx-4 md:my-0"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Shopping Cart */}
              <div className="flex justify-center items-center md:block">
                <button
                  type="button"
                  onClick={logoutFun}
                  className="mt-6 w-full rounded-lg bg-red-600 px-5 py-2 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-red-500 focus:outline-none focus:bg-red-500 lg:w-auto"
                >
                  Logout
                </button>
                <button
                  type="button"
                  onClick={getProfileDataFun}
                  className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-2 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 lg:w-auto"
                >
                  Get profile data
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  {data.length > 0 ? (
                    <>
                      Data Available and link is clickable{" "}
                      <Link href={`/profile/${data}`}>{data}</Link>
                    </>
                  ) : (
                    "Data Not Available"
                  )}
                </h1>

                <button
                  type="button"
                  className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-2 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 lg:w-auto"
                >
                  Shop Now
                </button>
              </div>
            </div>

            <div className="mt-6 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
              <img
                className="h-full w-full lg:max-w-3xl"
                src="https://merakiui.com/images/components/Catalogue-pana.svg"
                alt="Clothing catalogue illustration"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default ProfilePage;
