'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { crearCliente, editarCliente, getCliente } from '@/lib/features/clienteSlice'
import { fetchColaboradores } from '@/lib/features/colaboradorSlice'
import Titles from '@/app/components/ui/Titles'
import { AppDispatch } from '@/lib/store'
import { useParams } from 'next/navigation'
import ClienteNombre from '@/app/components/admin/ClienteNombre'
import useAlertCorrect from '@/hooks/useAlertCorrect'
import { obtenerUsuarios } from '@/lib/features/userSlice'

// interface State {
//     cliente: {cliente: {
//         rfc: string,
//         nombre: string,
//         giro: string,
//         contacto: string,
//         colaborador: number
//     }},
//     loading: boolean,
//     error: string | null
// }

interface Cliente {
  id: number | null,
    rfc: string,
    nombre: string,
    colaborador_id: number,
    user_id: number
}

const CrearCliente = () => {
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams<{id: string}>()

    const [rfc, setRfc] = useState('')
    const [nombre, setNombre] = useState('')
    const [user_id, setUser_id] = useState(0)
    const [colaborador, setColaborador] = useState(0)
    const [colaboradores, setColaboradores] = useState<any>([])
    const [users, setUsers] = useState<any>([])

    const nuevoCliente: Cliente = {
        id: params ? parseInt(params.id) : null,
        rfc,
        nombre,
        colaborador_id: colaborador,
        user_id
    }

    const getColaboradores = async () => {
        const data = await dispatch(fetchColaboradores())
        setColaboradores(data.payload)
    }

    const getUsers = async () => {
      const data = await dispatch(obtenerUsuarios())
      setUsers(data.payload)
    }

    const getClienteById = async (id: number) => {
        const cliente = await dispatch(getCliente(id))
        setRfc(cliente.payload.rfc)
        setNombre(cliente.payload.nombre)
        setColaborador(cliente.payload.colaborador_id)
        setUser_id(cliente.payload.user_id)
    }

    useEffect(() => {
      if(params.id) {
        getClienteById(parseInt(params.id))
      }
        getColaboradores()
        getUsers()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        useAlertCorrect(params ? 'Cliente editado correctamente' : 'Cliente creado correctamente')
        if(params.id) {
          dispatch(editarCliente(nuevoCliente)).then(() => {
            window.location.href = '/admin/clientes'
          })
        }
        dispatch(crearCliente(nuevoCliente)).then(() => {
          window.location.href = '/admin/clientes'
        })
    }

    const handleSelectUser = (e: any) => {
      console.log(e.target.value)
      setUser_id(e.target.value)
    }

    const handleSelectColaborador = (e: any) => {
      console.log(e.target.value)
      setColaborador(e.target.value)
    }

  return (
    <div className='my-10'>
      <ClienteNombre />
      <Titles title={params.id ? "Editar Cliente" : "Crear Cliente"} />
      <form onSubmit={e => handleSubmit(e)} className='w-3/4 mx-auto my-10'>
        <div className="my-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="rfc">RFC:</label>
          <input value={rfc} onChange={e => setRfc(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="rfc" name="rfc" placeholder='Ingresa el RFC'/>
        </div>
        <div className="my-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="nombre">Nombre:</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="nombre" name="nombre" placeholder='Ingresa el Nombre o Razón Social'/>
        </div>
        <div className="my-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="colaborador">Encargado:</label>
          <select onChange={(e) => handleSelectColaborador(e)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="colaborador" id="colaborador">
            <option className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="">--Selecciona un colaborador--</option>
            {colaboradores && colaboradores.map((colaborador: any) => (
              <option key={colaborador.id} value={colaborador.id}>{colaborador.user.nombre} {colaborador.user.apellido}</option>
              ))}
          </select>
        </div>
        <div className="my-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="colaborador">Usuario:</label>
          <select onChange={(e) => handleSelectUser(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="colaborador" id="colaborador">
            <option className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="">--Selecciona un colaborador--</option>
            {users && users.map((user: any) => (
              <option key={user.id} value={user.id}>{user.nombre} {user.apellido}</option>
              ))}
          </select>
        </div>
        <button type='submit' className="text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{params.id ? "Editar" : "Crear"}</button>
      </form>

    </div>
  )
}

export default CrearCliente
