'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearCliente } from '@/lib/features/clienteSlice'
import { fetchColaboradores } from '@/lib/features/colaboradorSlice'
import BotonAcento from '@/app/components/ui/BottonAcento'
import axios from 'axios'
import Titles from '@/app/components/ui/Titles'
import { AppDispatch } from '@/lib/store'
import Swal from 'sweetalert2'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import { redirect, useParams } from 'next/navigation'

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
    rfc: string,
    nombre: string,
    giro: string,
    contacto: string,
    colaborador_id: number
}

const CrearCliente = () => {
    const {user, isLoggedIn} = useIsLoggedIn()
    
    const cliente = useSelector((state: any) => state.cliente.cliente)
    const loading = useSelector((state: any) => state.loading)
    const error = useSelector((state: any) => state.error)
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams<{id: string}>()
    console.log(params)

    const [rfc, setRfc] = useState('')
    const [nombre, setNombre] = useState('')
    const [giro, setGiro] = useState('')
    const [contacto, setContacto] = useState('')
    const [colaborador, setColaborador] = useState(0)
    const [colaboradores, setColaboradores] = useState<any>([])

    const nuevoCliente: Cliente = {
        rfc,
        nombre,
        giro,
        contacto,
        colaborador_id: colaborador
    }

    const getColaboradores = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/colaboradores')
        return res.data
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
        const fetchColaboradoresFromServer = async () => {
            const colaboradoresFromServer = await getColaboradores()
            setColaboradores(colaboradoresFromServer)
            return colaboradoresFromServer
        }
        fetchColaboradoresFromServer()
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(crearCliente(nuevoCliente))
        Swal.fire({
          title: 'Cliente creado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          redirect('/admin/clientes')
        }, 1600)
          
    }
  return (
    <div className='my-10'>
      <Titles title="Crear cliente" />
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="giro">Giro Comercial:</label>
          <input value={giro} onChange={e => setGiro(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="giro" name="giro" placeholder='Ingresa el Giro Comercial'/>
        </div>
        <div className="my-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="contacto">Contacto:</label>
          <input value={contacto} onChange={e => setContacto(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="contacto" name="contacto" placeholder='Ingresa el nombre del contacto' />
        </div>
        <div className="my-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="colaborador">Encargado:</label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="colaborador" id="colaborador">
            <option className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="0">--Selecciona un colaborador--</option>
            {colaboradores && colaboradores.map((colaborador: any) => (
              <option onSelect={() => setColaborador(colaborador.id)} key={colaborador.id} value={colaborador.id}>{colaborador.nombre} {colaborador.apellido}</option>
              ))}
          </select>
        </div>
        <button type='submit' className="text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{params ? "Editar Usuario" : "Crear Usuario"}</button>
      </form>

    </div>
  )
}

export default CrearCliente
