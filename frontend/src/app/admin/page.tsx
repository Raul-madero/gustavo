'use client'
import React, { useEffect, useState } from 'react'
import TablaClientes from '../components/admin/TablaClientes'
import Titles from '../components/ui/Titles'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'


const Admin = () => {
  const {user, isLoggedIn} = useIsLoggedIn()
  
  if (!isLoggedIn) {
    window.location.href = '/login'
  }
  
  const adminUsers = () => {
    window.location.href = '/admin/usuarios'
  }
  const adminClientes = () => {
    window.location.href = '/admin/clientes'
  }
  const adminColaboradores = () => {
    window.location.href = '/admin/colaboradores'
  }

  return (
    <div>
        {user === "r.madero.ramirez@gmail.com" ? 
        <div className='mt-10 h-screen'>
          <Titles title='Admin' />
          <div className='w-10/12 mx-auto flex justify-between my-10'>
            <button className='bg-emerald-400 w-48 h-16 rounded-xl shadow-xl' onClick={adminUsers}>Usuarios</button>
            <button className='bg-emerald-400 w-48 h-16 rounded-xl shadow-xl' onClick={adminClientes}>Clientes</button>
            <button className='bg-emerald-400 w-48 h-16 rounded-xl shadow-xl' onClick={adminColaboradores}>Colaboradores</button>
          </div>
        </div>
          : <TablaClientes />
      }
    </div>
  )
}

export default Admin
