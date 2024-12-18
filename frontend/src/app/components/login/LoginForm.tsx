'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/lib/features/authSlice";
import BotonSimple from "../ui/BotonSimple";
import { AppDispatch } from "@/lib/store";
import Swal from "sweetalert2";

interface State {
    auth: {
        user: string,
        error: string
    }
}

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state: State) => state.auth.user);
    const error = useSelector((state: State) => state.auth.error);
    const dispatch = useDispatch<AppDispatch>();
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const login = await dispatch(signup({email, password}));
        console.log(login.payload)
        if(login.payload.access_token) {
            const token = login.payload.access_token
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('user', email)
            window.location.href = '/admin'
        }else {
            let error = login.payload
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message + " " + error.code
            })
        }
        setEmail('');
        setPassword('');
        
    }

    return (
        <div className="max-w-sm mx-auto flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="ejemplo@correo.com"
                    required
                />
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password:
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Tu contraseña"
                    required
                />
                <button type="submit" className="text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-8">Iniciar sesión</button>
            </form>
            <div className="flex gap-10 items-center justify-between">
                <BotonSimple navegar="/register" texto="¿No tienes cuenta? Registrate" />
                <BotonSimple navegar="/olvide" texto="Olvidé mi contraseña" />
            </div>
        </div>
    );
}

export default LoginForm;