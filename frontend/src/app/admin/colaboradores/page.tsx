'use client'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import React from 'react'

const Colaboradores = () => {
  const {user, isLoggedIn} = useIsLoggedIn()

  if (!isLoggedIn) {
    window.location.href = '/login'
  }

  return (
    <div>
      colaboradores
    </div>
  )
}

export default Colaboradores
