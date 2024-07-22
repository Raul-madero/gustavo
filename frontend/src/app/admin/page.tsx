'use client'
import React, { use, useEffect } from 'react'
import TablaClientes from '../components/admin/TablaClientes'
import Titles from '../components/ui/Titles'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { getUserByEmail } from '@/lib/features/userSlice'


const Admin = () => {
  const {user, isLoggedIn} = useIsLoggedIn()
  const dispatch = useDispatch<AppDispatch>()

  const findUser = async () => {
    const res = await dispatch(getUserByEmail(user))
    console.log(res)
  }

  if (isLoggedIn) {
    findUser()
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
          <h1>{user}</h1>
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
