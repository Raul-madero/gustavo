import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearCliente } from '@/lib/features/clienteSlice'

interface State {
    cliente: {cliente: {
        rfc: string,
        nombre: string,
        giro: string,
        contacto: string,
        colaborador: number
    }},
    loading: boolean,
    error: string | null
}

const CrearCliente = () => {
    const cliente = useSelector((state: State) => state.cliente.cliente)
    const loading = useSelector((state: State) => state.loading)
    const error = useSelector((state: State) => state.error)
    const dispatch = useDispatch()
  return (
    <div>
      Crear Cliente
    </div>
  )
}

export default CrearCliente
