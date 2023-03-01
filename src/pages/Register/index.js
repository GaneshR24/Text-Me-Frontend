import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoader, ShowLoader } from "../../redux/loaderSlice";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline, MdOutlinePerson } from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      dispatch(ShowLoader());
      const response = await RegisterUser(user);
      dispatch(HideLoader());
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
            {/* Register */}
            <div className="w-3/5 p-5">
              <div className="text-left font-bold">
                <span className="text-primary text-3xl">Text</span>{" "}
                <span className="text-3xl">Me</span>
              </div>
              <div className="pt-10 pb-5">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  Register
                </h2>
                <div className="border-2 w-10 border-primary inline-block mb-2"></div>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdOutlinePerson className="text-gray-400 m-2" />
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      placeholder="Name"
                      className="bg-gray-100 outline-none border-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      placeholder="Email"
                      className="bg-gray-100 outline-none border-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      placeholder="Password"
                      className="bg-gray-100 outline-none border-none text-sm flex-1"
                    />
                  </div>
                  <button
                    className="border-2 border-primary text-primary rounded-full px-12 m-5 py-2 inline-block font-semibold hover:bg-primary hover:text-white"
                    onClick={register}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            {/* Login */}
            <div className="w-2/5 bg-primary text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
              <h2 className="text-3xl font-bold mb-2">Hello, Friends!</h2>
              <div className="border-2 w-10 border-white inline-block mb-2"></div>
              <p className="mb-10">
                Welcome back, Login to text with your friends!
              </p>
              <Link
                to={"/login"}
                className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-primary"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
