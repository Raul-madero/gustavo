'use client'
import Titles from '@/app/components/ui/Titles'
import { crearUsuario } from '@/lib/features/userSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const CrearUsuario = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telefono, setTelefono] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(crearUsuario({email, password, telefono}))
    setEmail('')
    setPassword('')
    setTelefono('')
  }

  return (
    <div className='w-3/4 mx-auto'>
      <Titles title="Crear Usuario" />
      <form onSubmit={e => handleSubmit(e)}>
        <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email:</label>
            <input onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" id="email" name="email" placeholder='Ingresa el Email'/>
        </div>
        <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">password:</label>
            <input onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="password" name="password" placeholder='Ingresa el password'/>
        </div>
        <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="telefono">telefono:</label>
            <input onChange={e => setTelefono(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="tel" id="telefono" name="telefono" placeholder='Ingresa el telefono'/>
        </div>
        <button type='submit'>Crear Usuario</button>
      </form>
    </div>
  )
}

export default CrearUsuario
