'use client'
import React, { use, useEffect, useState } from 'react'
import TablaClientes from '../components/admin/TablaClientes'
import Titles from '../components/ui/Titles'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { getUserByEmail } from '@/lib/features/userSlice'
import Link from 'next/link'
import ClienteNombre from '../components/admin/ClienteNombre'


const Admin = () => {
  // const {email, isLoggedIn} = useIsLoggedIn()


  return (
    <div>
        {/* {email === "r.madero.ramirez@gmail.com" ?  */}
        <div className='mt-10 h-screen'>
          <ClienteNombre />
          <Titles title='Admin' />
          <div className='w-10/12 mx-auto flex justify-between my-10'>
            <Link href="/admin/usuarios" className='text-white font-bold text-center flex justify-center items-center bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>Usuarios</Link>
            <Link href="/admin/clientes" className='text-white font-bold text-center flex justify-center items-center bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>Clientes</Link>
            <Link href="/admin/colaboradores" className='text-white font-bold text-center flex justify-center items-center bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>Colaboradores</Link>
          </div>
        </div>
          {/* : <TablaClientes /> */}
      {/* } */}
    </div>
  )
}

export default Admin
