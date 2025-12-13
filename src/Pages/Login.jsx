import React, { useEffect, useState } from 'react'
import Car1 from "../assets/Car_Images_1.jpg"
import { Link, useNavigate } from 'react-router'
import { LoginUser } from '../API/api'
import { toast } from 'react-toastify'



const Login = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false);
    const [role, setRole] = useState(localStorage.getItem("role") || "normal");


    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });


    const HandleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await LoginUser(loginData);
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000,
            });

            localStorage.setItem("isAuth", response.data.isAuth);
            localStorage.setItem("role", response.data.role)

            if (response.status === 200) {
                navigate("/")
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!", {
                position: "top-center",
                autoClose: 2000,
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    return (

        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

            <img
                src={Car1}
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative z-10 w-full max-w-md bg-black/30 border-2 border-cyan-600 shadow-[0_0_10px_rgba(0,0,0,0.8)] rounded-lg p-8 text-center">

                <form onSubmit={HandleSubmit}>

                    <h3 className="text-[#00CFFF] text-2xl font-extrabold italic mb-6">
                        Login
                    </h3>

                    <div>
                        <label className="block text-left text-[#00CFFF] font-bold text-lg mb-1">
                            Email :
                        </label>
                        <input
                            type="email"
                            value={loginData.email}
                            name='email'
                            placeholder="Enter Your Email"
                            required
                            onChange={(e) => HandleOnChange(e)}
                            className="w-full p-3 mb-4 bg-black/40 border-[3px] border-sky-400 rounded-lg text-[rgba(0,207,255,0.8)] font-bold text-base outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-left text-[#00CFFF] font-bold text-lg mb-1">
                            Password :
                        </label>
                        <input
                            type="password"
                            value={loginData.password}
                            name='password'
                            placeholder="Enter Your Password"
                            required
                            onChange={(e) => HandleOnChange(e)}
                            className="w-full p-3 bg-black/50 border-[3px] border-sky-400 rounded-lg text-[rgba(0,207,255,0.8)] font-bold text-base outline-none"
                        />

                        <p className="mt-1 text-right text-[#00E5FF] font-bold text-sm cursor-pointer transition text-shadow hover:text-sky-400">
                            🤫 Hide Password
                        </p>
                    </div>


                    <div>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-gray-300 font-semibold'>
                                Forget Password ?
                            </h1>
                            <Link
                                to="/forgetpassword"
                                className="ml-2 font-bold text-lg px-2 py-1 rounded transition text-red-700 hover:text-red-600"
                            >
                                Reset Here
                            </Link>
                        </div>
                        <div className="flex justify-center items-center">
                            <h1 className='text-gray-300 font-semibold'>
                                Don't Have An Account ?
                            </h1>
                            <Link
                                to="/register"
                                className="inline-block font-bold text-lg px-2 py-1 rounded transition hover:scale-110 text-[rgba(0,207,255,0.8)] hover:text-sky-600"
                            >
                                Register Now
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full py-3 bg-blue-900 text-[#00CFFF] text-lg rounded-lg hover:scale-105 transition cursor-pointer disabled:bg-gray-900 disabled:text-white disabled:cursor-not-allowed disabled:hover:scale-100 font-bold"
                    >
                        Login
                    </button>

                </form>

            </div>
        </div>

    )
}

export default Login