import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import CustomDialog from "../components/CustomDialog";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const handleRegister = async () => {

        try {

            await api.post("/auth/register", {

                userName: name,
                email,
                password,

            });

            setDialogMessage("Registration Successful!");
            setDialogOpen(true);

            setTimeout(() => {

                setDialogOpen(false);
                navigate("/");

            }, 1500);


        } catch (error: any) {

            if (error.response?.data) {

                if (error.response.data.message) {

                    setDialogMessage(error.response.data.message);

                } else {

                    const errors = Object.values(error.response.data) as string[];

                    if (errors.length > 0) {
                        setDialogMessage(errors[0]);
                    } else {
                        setDialogMessage("Registration Failed");
                    }

                }

            } else {

                setDialogMessage("Registration Failed");

            }

            setDialogOpen(true);

            console.log(error)} };

        return (

            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">

                <div className="bg-white rounded-3xl shadow-2xl p-10 w-[430px]">

                    <div className="text-center mb-8">

                        <h1 className="text-4xl font-bold text-indigo-600">
                            📄 DocFlow
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Create your account
                        </p>

                    </div>

                    <div className="space-y-5">

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <button
                            onClick={handleRegister}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-4 rounded-xl font-semibold"
                        >
                            Register
                        </button>

                    </div>

                    <div className="text-center mt-6">

                    <span className="text-gray-500">
                        Already have an account?
                    </span>

                        <Link
                            to="/"
                            className="text-indigo-600 font-semibold ml-2 hover:underline"
                        >
                            Login
                        </Link>

                    </div>

                </div>

                <CustomDialog
                    open={dialogOpen}
                    title="DocFlow"
                    message={dialogMessage}
                    onClose={() => setDialogOpen(false)}
                />

            </div>

        );
    }

export default Register;