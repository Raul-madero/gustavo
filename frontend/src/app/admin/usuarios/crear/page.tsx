'use client'
import Titles from '@/app/components/ui/Titles'
import { crearUsuario, editUser, getUser } from '@/lib/features/userSlice'
import { AppDispatch } from '@/lib/store'
import { isAsyncThunkAction } from '@reduxjs/toolkit'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const CrearUsuario = () => {
  const dispatch = useDispatch<AppDispatch>()
  const params = window.location.search
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telefono, setTelefono] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if(params) {
      const id = params.split('=')[1]
      const user = await dispatch(editUser({id: parseInt(id), email, password, telefono}))
      if (user.payload) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario editado correctamente.",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          setEmail('')
        setPassword('')
        setTelefono('')
        window.location.href = '/admin/usuarios'
        }, 1600)
      }
    } else {
      const user = await dispatch(crearUsuario({id: null, email, password, telefono}))
      if (user.payload) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario creado correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          setEmail('')
        setPassword('')
        setTelefono('')
        window.location.href = '/admin/usuarios'
        }, 1600)
      }
    }
  }

  const encontrarUsuario = async () => {
      if (params) {
        const id = params.split('=')[1]
        const usuario = await dispatch(getUser(parseInt(id)))
        setEmail(usuario.payload.email)
        setTelefono(usuario.payload.telefono)
      }
    }

  useEffect(() => {
    encontrarUsuario()
  }, [])

  return (
    <div className='w-3/4 mx-auto h-screen'>
      <Titles title={params ? "Editar Usuario" : "Crear Usuario"} />
      <form onSubmit={e => handleSubmit(e)}>
        <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email:</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" id="email" name="email" placeholder='Ingresa el Email' required/>
        </div>
        {!params ? <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">password:</label>
            <input onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="password" name="password" placeholder='Ingresa el password' required/>
        </div> : null}
        <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="telefono">telefono:</label>
            <input value={telefono} onChange={e => setTelefono(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="tel" id="telefono" name="telefono" placeholder='Ingresa el telefono' required/>
        </div>
        <button type='submit' className="text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{params ? "Editar Usuario" : "Crear Usuario"}</button>
      </form>
      <Link href="/admin/usuarios" type='button' className='block w-10/12 text-center mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Volver</Link>
    </div>
  )
}

export default CrearUsuario
