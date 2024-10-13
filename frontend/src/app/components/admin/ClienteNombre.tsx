import useIsLoggedIn from '@/hooks/useIsLoggedIn'
import React from 'react'

const ClienteNombre = () => {
    const {user} = useIsLoggedIn()
    return (
        <h1 className='text-center text-xl dark:text-gray-200 font-bold my-10'>{`Hola: ${user}`}</h1>
    )
}

export default ClienteNombre
