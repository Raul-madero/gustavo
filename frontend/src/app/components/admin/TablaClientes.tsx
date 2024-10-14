'use client'
import { eliminarCliente, getClientes } from '@/lib/features/clienteSlice'
import { AppDispatch } from '@/lib/store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Titles from '../ui/Titles'
import Link from 'next/link'
import Swal from 'sweetalert2'

const TablaClientes = () => {
    const dispatch = useDispatch<AppDispatch>()
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

    const confirmEliminar = async (id: number) => {
      console.log(id)
      dispatch(eliminarCliente(id)).then(() => {
        window.location.reload()
      })
    }

    const handleEliminar = (cliente: any) => {
      Swal.fire({
        title: `¿Estás seguro de eliminar a ${cliente.nombre}?`,
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          confirmEliminar(cliente.id)
          Swal.fire({
            title: "¡Eliminado!",
            text: "El usuario ha sido eliminado.",
            icon: "success"
          });
        }
      });
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
            <th className="px-6 py-3 text-center">Colaborador</th>
            <th className='px-6 py-3 text-center'>Acciones</th>
          </tr>
        </thead>
        <tbody >
          {clients && clients.map((cliente: any) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={cliente.id}>
              <td className="px-6 py-3">{cliente.rfc}</td>
              <td className="px-6 py-3 font-extrabold text-center">{cliente.nombre}</td>
              <td className='px6 py-3 text-center'>{cliente.colaborador.user.nombre + " " + cliente.colaborador.user.apellido}</td>
              <td className="px-6 py-3 flex gap-2 justify-center items-center">
                <button onClick={() => handleEditar(cliente.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 max-w-1/2">Editar</button>
                <button onClick={() => handleEliminar(cliente)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full max-w-1/2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaClientes
