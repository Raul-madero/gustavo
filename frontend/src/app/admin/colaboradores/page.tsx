'use client'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import React from 'react'

const Colaboradores = () => {
  const {user, isLoggedIn} = useIsLoggedIn()

  return (
    <div>
      colaboradores
    </div>
  )
}

export default Colaboradores
