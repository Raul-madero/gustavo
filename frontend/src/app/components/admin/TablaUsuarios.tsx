'use client'
import { eliminarUsuario, obtenerUsuarios } from '@/lib/features/userSlice'
import { AppDispatch, RootState } from '@/lib/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Titles from '../ui/Titles'
import Swal from 'sweetalert2'
import Link from 'next/link'
import ClienteNombre from './ClienteNombre'

const TablaUsuarios = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [users, setUsers] = useState<any>([])

  const getUsers = async () => {
    const usersFromserver = await dispatch(obtenerUsuarios())
    return usersFromserver
  }

  const confirmEliminar = (id: number) => {
    dispatch(eliminarUsuario(id))
    window.location.reload()
  }

  const handleEliminar = (id: number, email: string) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar a ${email}?`,
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        confirmEliminar(id)
        Swal.fire({
          title: "¡Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  const handleEditar = (id: number) => {
    window.location.href = `/admin/usuarios/crear/${id}`
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers()
      setUsers(users.payload || [])
    }
    fetchUsers()
  }, [])

  return (
    <div className='h-screen my-10'>
      <ClienteNombre />
      <Titles title="Usuarios" />
      <Link href="/register" type='button' className='block w-10/12 text-center mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Crear Usuario</Link>
      <table className="w-11/12 mx-auto my-10 rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-center">Nombre</th>
            <th className="px-6 py-3 text-center">Apellido</th>
            <th className="px-6 py-3 text-center">Correo</th>
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody >
          {users && users.map((usuario: any) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={usuario.id}>
              <td className="px-6 py-3">{usuario.nombre}</td>
              <td className="px-6 py-3">{usuario.apellido}</td>
              <td className="px-6 py-3">{usuario.email}</td>
              <td className="px-6 py-3 flex gap-2">
                <button onClick={() => handleEditar(usuario.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 max-w-1/2">Editar</button>
                <button onClick={() => handleEliminar(usuario.id, usuario.nombre)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full max-w-1/2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaUsuarios
