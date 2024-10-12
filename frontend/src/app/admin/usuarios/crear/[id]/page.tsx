'use client'
import Titles from '@/app/components/ui/Titles'
import useAlertCorrect from '@/hooks/useAlertCorrect'
import useAlertError from '@/hooks/useAlertError'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import { getClienteByName } from '@/lib/features/clienteSlice'
import { getColaboradorByName } from '@/lib/features/colaboradorSlice'
import { crearUsuario, editUser, getUser } from '@/lib/features/userSlice'
import { AppDispatch } from '@/lib/store'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const CrearUsuario = () => {

  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useParams<{id: string}>()
  const params = parseInt(searchParams.id)
  const [clienteId, setClienteId] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const getClienteId = async () => {
  //   const cliente = await dispatch(getClienteByName(nombre))
  //   if (cliente.payload) {
  //     setClienteId(cliente.payload.id)
  //   }else {
  //     const colaborador = await dispatch(getColaboradorByName(nombre))
  //     if (colaborador.payload) {
  //       setClienteId(colaborador.payload.id)
  //     }
  //   }
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if(params !== 0) {
      const id = params
      // const cliente = await getClienteId()
      const user = await dispatch(editUser({ id, email, password }))
      
      if (user.payload) {
        useAlertCorrect("Usuario editado correctamente")
        setTimeout(() => {
          setEmail('')
        setPassword('')
        setTelefono('')
        window.location.href = '/admin/usuarios'
        }, 1600)
      }
    } else {
      const user = await dispatch(crearUsuario({ id: null, email, password }))
      if (user.payload.code === 201) {
        useAlertCorrect("Usuario creado correctamente")
        setTimeout(() => {
          setEmail('')
        setPassword('')
        setTelefono('')
        window.location.href = '/admin/usuarios'
        }, 1600)
      }else if (user.payload.code === 400) {
        useAlertError("El email ya existe")
      }
    }
  }

  const encontrarUsuario = async () => {
      if (params !== 0) {
        const id = params
        const usuario = await dispatch(getUser(id))
        setEmail(usuario.payload.email)
        setTelefono(usuario.payload.telefono)
        setClienteId(usuario.payload.cliente_id)
      }
    }

  useEffect(() => {
    encontrarUsuario()
  }, [])

  return (
    <div className='w-3/4 mx-auto h-screen'>
      <Titles title={params !== 0 ? "Editar Usuario" : "Crear Usuario"} />
      <form onSubmit={e => handleSubmit(e)}>
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
        <button type='submit' className="text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{params !== 0 ? "Editar Usuario" : "Crear Usuario"}</button>
      </form>
      <Link href="/admin/usuarios" type='button' className='block w-10/12 text-center mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Volver</Link>
    </div>
  )
}

export default CrearUsuario
