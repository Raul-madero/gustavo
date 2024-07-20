'use client'
import TablaUsuarios from '@/app/components/admin/TablaUsuarios'
import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import React, { useEffect, useState } from 'react'

const Usuarios = () => {
    const {user, isLoggedIn} = useIsLoggedIn()

    if (!isLoggedIn) {
        window.location.href = '/login'
    }

    return (
        <div>
            <h1>{user}</h1>
            <TablaUsuarios />
        </div>
    )
}

export default Usuarios
