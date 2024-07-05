'use client'
import { eliminarUsuario, obtenerUsuarios } from '@/lib/features/userSlice'
import { AppDispatch, RootState } from '@/lib/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Titles from '../ui/Titles'
import Swal from 'sweetalert2'
import Link from 'next/link'

const TablaUsuarios = () => {
  const dispatch = useDispatch<AppDispatch>()
  const usuarios = useSelector((state: RootState) => state.user.usuario)
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
      title: "<strong>HTML <u>example</u></strong>",
      icon: "info",
      html: `
        You can use <b>bold text</b>,
        <a href="#" autofocus>links</a>,
        and other HTML tags
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
      cancelButtonAriaLabel: "Thumbs down"
    });
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
      <Titles title="Usuarios" />
      <Link href="/admin/usuarios/crear" type='button' className='block w-10/12 text-center mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Crear Usuario</Link>
      <table className="w-11/12 mx-auto my-10 rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-center">Email</th>
            <th className="px-6 py-3 text-center">Telefono</th>
            <th className="px-6 py-3 text-center">Cliente</th>
            <th className="px-6 py-3 text-center">Colaborador</th>
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody >
          {users && users.map((usuario: any) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={usuario.id}>
              <td className="px-6 py-3">{usuario.email}</td>
              <td className="px-6 py-3">{usuario.telefono}</td>
              <td className="px-6 py-3">{usuario.cliente[0]}</td>
              <td className="px-6 py-3">{usuario.colaborador ? `${usuario.colaborador.nombre} ${usuario.colaborador.apellido}`: ""}</td>
              <td className="px-6 py-3">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">Editar</button>
                <button onClick={() => handleEliminar(usuario.id, usuario.email)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaUsuarios
