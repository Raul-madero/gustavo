'use client'
import React, { use, useEffect } from 'react'
import TablaClientes from '../components/admin/TablaClientes'
import Titles from '../components/ui/Titles'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { getUserByEmail } from '@/lib/features/userSlice'
import Link from 'next/link'


const Admin = () => {
  const {user, isLoggedIn} = useIsLoggedIn()
  const dispatch = useDispatch<AppDispatch>()

  const findUser = async () => {
    const res = await dispatch(getUserByEmail(user))
    return res
  }

  if (isLoggedIn) {
    findUser()
  }

  return (
    <div>
        {user === "r.madero.ramirez@gmail.com" ? 
        <div className='mt-10 h-screen'>
          <h1>{user}</h1>
          <Titles title='Admin' />
          <div className='w-10/12 mx-auto flex justify-between my-10'>
            <Link href="/admin/usuarios" className='bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>Usuarios</Link>
            <Link href="/admin/clientes" className='bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>Clientes</Link>
            <Link href="/admin/colaboradores" className='bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>Colaboradores</Link>
          </div>
        </div>
          : <TablaClientes />
      }
    </div>
  )
}

export default Admin
