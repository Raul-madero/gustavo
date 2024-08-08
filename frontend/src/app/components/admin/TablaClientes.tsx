'use client'
import { getClientes } from '@/lib/features/clienteSlice'
import { AppDispatch, RootState } from '@/lib/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Titles from '../ui/Titles'
import Link from 'next/link'

const TablaClientes = () => {
    const dispatch = useDispatch<AppDispatch>()
    const clientes = useSelector((state: RootState) => state.cliente.cliente)
    const [clients, setClients] = useState<any>([])

    const getClients = async () => {
        const clientsFromServer = await dispatch(getClientes())
        return clientsFromServer
    }

    useEffect(() => {
        getClients().then((res: any) => {
            setClients(res.payload)
        })
    }, [])

    const handleEliminar = (id: number) => {
        console.log(id)
    }

    const handleEditar = (id: number) => {
        console.log(id)
    }

  return (
    <div className='h-screen my-10'>
      <Titles title="Clientes" />
      <Link href="/admin/clientes/crear" type='button' className='block w-10/12 text-center mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Crear Cliente</Link>
      <table className="w-11/12 mx-auto my-10 rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-center">RFC</th>
            <th className="px-6 py-3 text-center">Nombre</th>
            {/* <th className="px-6 py-3 text-center">Giro</th> */}
            {/* <th className="px-6 py-3 text-center">Contacto</th> */}
            <th className="px-6 py-3 text-center">Colaborador</th>
          </tr>
        </thead>
        <tbody >
          {clients && clients.map((cliente: any) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={cliente.id}>
              <td className="px-6 py-3">{cliente.rfc}</td>
              <td className="px-6 py-3 font-extrabold">{cliente.nombre}</td>
              {/* <td className="px-6 py-3">{cliente.giro}</td> */}
              {/* <td className="px-6 py-3">{cliente.contacto}</td> */}
              <td className="px-6 py-3 flex gap-2 justify-center items-center">
                <button onClick={() => handleEditar(cliente.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 max-w-1/2">Editar</button>
                <button onClick={() => handleEliminar(cliente.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full max-w-1/2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaClientes
