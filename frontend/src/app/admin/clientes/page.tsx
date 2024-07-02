'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Clientes = () => {
    const getClientes = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/clientes')
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    const [clientes, setClientes] = useState([])
    useEffect(() => {
        const fetchClientes = async () => {
            const clientesFromServer = await getClientes()
            setClientes(clientesFromServer)
        }
        fetchClientes()
    }, [])
  return (
    <div>
      <pre>{JSON.stringify(clientes, null, 2)}</pre>
    </div>
  )
}

export default Clientes
