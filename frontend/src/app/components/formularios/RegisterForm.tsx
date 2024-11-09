'use client'
import useAlertCorrect from "@/hooks/useAlertCorrect";
import useAlertError from "@/hooks/useAlertError";
import { crearUsuario } from "@/lib/features/userSlice";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface User {
    id: number
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    verificado: boolean
}

const RegisterForm = () => {
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams<{id: string}>()

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const newUser: User = {
        id: params.id ? parseInt(params.id) : 0,
        nombre,
        apellido,
        email,
        password,
        verificado: false
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = await dispatch(crearUsuario(newUser))
        if (user.meta.requestStatus === "fulfilled") {
            useAlertCorrect('Usuario creado correctamente')
        } else {
            useAlertError(user.payload.message)
        }
        setTimeout(() => {
            window.location.href = '/admin/usuarios'
        }, 2000)
    }

    return (
        <div className="my-10">
            <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
            <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="nombre">Nombre:</label>
                <input onChange={(e) => setNombre(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre"/>
            </div>
            <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="apellido">Apellido:</label>
                <input onChange={(e) => setApellido(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="apellido" name="apellido" placeholder="Ingresa tu apellido"/>
            </div>
            <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email:</label>
                <input onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" id="email" name="email" placeholder="Ingresa tu email"/>
            </div>
            <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="password" name="password" placeholder="Ingresa tu password"/>
            </div>
                <div className="my-8">
                    <button type="submit" className='block w-10/12 text-center mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' >Registrarse</button>
                </div>
            </form>
            <Link href="/admin/usuarios" className=" block  w-24 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:from-slate-500 dark:to-slate-500 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-8 mx-auto mb-2" type='button' >Volver</Link>
        </div>
    );

}

export default RegisterForm;