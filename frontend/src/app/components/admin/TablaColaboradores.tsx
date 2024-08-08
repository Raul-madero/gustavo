'use client'
import { fetchColaboradores } from '@/lib/features/colaboradorSlice'
import { AppDispatch } from '@/lib/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

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

    console.log(colabs)

    const handleEliminar = (id: number, nombre: string, apellido: string) => {
        console.log(id, nombre, apellido)
    }

    const handleEditar = (id: number) => {
        console.log(id)
    }

    return (
        <div>
            <Link href="/admin/colaboradores/crear" type='button' className='block w-10/12 text-center mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Crear Colaborador</Link>
            <table className="w-11/12 mx-auto my-10 rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-6 py-3 text-center">Nombre</th>
                    <th className="px-6 py-3 text-center">Apellido</th>
                    <th className="px-6 py-3 text-center">Admin</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
                </thead>
                <tbody >
                {colabs && colabs.map((colab: any) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={colab.id}>
                    <td className="px-6 py-3 text-center">{colab.nombre}</td>
                    <td className="px-6 py-3 text-center">{colab.apellido}</td>
                    <td className="px-6 py-3 text-center">{colab.is_admin ? "Admin" : ""}</td>
                    <td className="px-6 py-3 flex gap-2 items-center justify-center">
                        <button onClick={() => handleEditar(colab.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 max-w-1/2">Editar</button>
                        <button onClick={() => handleEliminar(colab.id, colab.nombre, colab.apellido)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full max-w-1/2">Eliminar</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaColaboradores
