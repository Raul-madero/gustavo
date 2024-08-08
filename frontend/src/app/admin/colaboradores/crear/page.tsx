'use client'
import Titles from '@/app/components/ui/Titles'
import useAlertCorrect from '@/hooks/useAlertCorrect'
import useAlertError from '@/hooks/useAlertError'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import { crearColaborador, editColaborador } from '@/lib/features/colaboradorSlice'
import { AppDispatch } from '@/lib/store'
import { redirect, useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const crearcolaborador = () => {
    const searchParams = useParams<{id: string}>()
    const params = parseInt(searchParams.id)
    const dispatch = useDispatch<AppDispatch>()
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [administrador, setAdministrador] = useState(false)

    const handleSubmit = async (e: any) => {
        console.log(nombre, apellido, administrador)
        e.preventDefault()
        if(params) {
            const colaborador = await dispatch(editColaborador({id: params, nombre, apellido, is_admin: administrador}))
            if (colaborador.payload) {
                useAlertCorrect('Colaborador editado correctamente')
                setTimeout(() => {
                    redirect('/admin/colaboradores')
                }, 1600)
            }else {
                useAlertError('Error al editar el colaborador')
            }            
        }else{
            const data = await dispatch(crearColaborador({nombre, apellido, is_admin: administrador}))
            if (data.payload) {
                useAlertCorrect('Colaborador creado correctamente')
                setTimeout(() => {
                    redirect('/admin/colaboradores')
                }, 1600)
            }else {
                useAlertError('Error al crear el colaborador')
            }
        }
        setNombre('')
        setApellido('')
        setAdministrador(false)

    }

    const handleChecked = (e: any) => {
        setAdministrador(e.target.value)
    }
  return (
    <div className='w-3/4 mx-auto my-10 h-screen'>
        <Titles title="Crear colaborador" />
        <form onSubmit={handleSubmit}>
            <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="nombre">Nombre:</label>
                <input onChange={e => setNombre(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="nombre" name="nombre" placeholder='Ingresa el Nombre'/>
            </div>
            <div className="my-8">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="apellido">Apellidos:</label>
            <input onChange={e => setApellido(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="apellido" name="apellido" placeholder='Ingresa los Apellidos'/>
            </div>
            <div  className='flex items-center gap-10 justify-center mb-10'>
                <div className="flex items-center">
                    <input onChange={handleChecked} id="default-radio-1" type="radio" value="true" name="colaborador" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Administrador</label>
                </div>
                <div className="flex items-center">
                    <input onChange={handleChecked}  id="default-radio-2" type="radio" value="false" name="colaborador" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Colaborador</label>
                </div>
            </div>
            <button type='submit'className="text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{params ? "Editar Colaborador" : "Crear Colaborador"}</button>
        </form>
    </div>
  )
}

export default crearcolaborador
