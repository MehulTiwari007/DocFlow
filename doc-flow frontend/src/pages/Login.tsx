import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Email or Password");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-4 py-8">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 md:p-10">

                <div className="text-center mb-8">

                    <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600">
                        📄 DocFlow
                    </h1>

                    <p className="text-sm sm:text-base text-gray-500 mt-2">
                        Welcome back! Sign in to continue.
                    </p>

                </div>

                <div className="space-y-5">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-xl p-3 sm:p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-xl p-3 sm:p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 sm:py-4 rounded-xl font-semibold"
                    >
                        Login
                    </button>

                </div>

                <div className="text-center mt-6 text-sm sm:text-base">

                    <span className="text-gray-500">
                        Don't have an account?
                    </span>

                    <Link
                        to="/register"
                        className="text-indigo-600 font-semibold ml-2 hover:underline"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default Login;