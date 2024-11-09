'use client'
import { deleteColaborador, fetchColaboradores } from '@/lib/features/colaboradorSlice'
import { AppDispatch } from '@/lib/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const TablaColaboradores = () => {
    const [colabs, setColabs] = useState<any>([])
    const dispatch = useDispatch<AppDispatch>()

    const getcolab = async () => {
        const data = await dispatch(fetchColaboradores())
        return data
    }

    useEffect(() => {
        getcolab().then((res: any) => {
            setColabs(res.payload)
        })
    }, [])

    const confirmEliminar = (id: number) => {
        dispatch(deleteColaborador(id))
        window.location.reload()
    }

    const handleEliminar = (id: number, nombre: string, apellido: string) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar a ${nombre} ${apellido}?`,
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
        window.location.href = `/admin/colaboradores/crear/${id}`
    }

    return (
        <div>
            <table className="w-11/12 mx-auto my-10 rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-6 py-3 text-center">Nombre</th>
                    <th className="px-6 py-3 text-center">Apellido</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
                </thead>
                <tbody >
                {colabs && colabs.map((colab: any) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={colab.id}>
                    <td className="px-6 py-3 text-center">{colab.user.nombre}</td>
                    <td className="px-6 py-3 text-center">{colab.user.apellido}</td>
                    <td className="px-6 py-3 flex gap-2 items-center justify-center">
                        <button onClick={() => handleEliminar(colab.id, colab.user.nombre, colab.user.apellido)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full max-w-1/2">Eliminar</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link href="/admin" type='button' className='block w-10/12 text-center mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Volver</Link>
        </div>
    )
}

export default TablaColaboradores