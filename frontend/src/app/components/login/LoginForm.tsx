'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/lib/features/authSlice";
import BotonSimple from "../ui/BotonSimple";
import BotonAcento from "../ui/BottonAcento";
import { AppDispatch } from "@/lib/store";

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
        console.log(login)
        if(login) {
            const token = login.payload.access_token
            localStorage.setItem('token', token)
            window.location.href = '/admin'
        }
        setEmail('');
        setPassword('');
        
    }

    return (
        <div className="max-w-sm mx-auto flex flex-col gap-10">
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
                <button type="submit" className="text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Iniciar sesión</button>
                {error && <p>{error}</p>}
            </form>
            <div className="flex gap-10 items-center justify-between">
                <BotonSimple navegar="/register" texto="¿No tienes cuenta? Registrate" />
                <BotonSimple navegar="/forgot-password" texto="Olvidé mi contraseña" />
            </div>
        </div>
    );
}

export default LoginForm;