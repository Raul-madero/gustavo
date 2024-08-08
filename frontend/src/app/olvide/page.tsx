'use client'

import { AppDispatch } from "@/lib/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Titles from "../components/ui/Titles";
import { editUser, getUserByEmail } from "@/lib/features/userSlice";
import useAlertCorrect from "@/hooks/useAlertCorrect";
import useAlertError from "@/hooks/useAlertError";


const Olvide = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await dispatch(getUserByEmail(email));
        if(user.payload.id) {
            const edit = await dispatch(editUser({id: user.payload.id, email, password, telefono: user.payload.telefono, cliente_id: user.payload.cliente_id}))
            if (edit.payload) {
                useAlertCorrect("Contraseña cambiada correctamente")
                setTimeout(() => {
                    setEmail('')
                    setPassword('')
                    window.location.href = '/login'
                }, 1600)
            }
        }else {
            let error = user.payload
            useAlertError(error.message + " " + error.code)
        }
        console.log(user.payload)
    }

    return (
        <div className="w-9/12 mx-auto mt-10">
            <Titles title="Olvidé mi contraseña" />
            <p className="text-gray-200 text-2xl my-5">Ingrese sus datos para recuperar su contraseña:</p>
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
                    Nueva contraseña:
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
                <button type="submit" className="w-1/2 text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mb-2">Cambiar contraseña</button>
            </form>
        </div>
    );
};

export default Olvide;