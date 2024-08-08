'use client'
import ClienteNombre from '@/app/components/admin/ClienteNombre'
import TablaColaboradores from '@/app/components/admin/TablaColaboradores'
import Titles from '@/app/components/ui/Titles'
import React from 'react'

const Colaboradores = () => {
  return (
    <div>
      <ClienteNombre />
      <Titles title='Colaboradores' />
      <TablaColaboradores />
    </div>
  )
}

export default Colaboradores
