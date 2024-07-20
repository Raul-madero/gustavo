'use client'
import TablaClientes from "@/app/components/admin/TablaClientes"
import useIsLoggedIn from "@/hooks/useIsLoggedIn"

const Clientes = () => {  
    const {user, isLoggedIn} = useIsLoggedIn()

    if (!isLoggedIn) {
      window.location.href = '/login'
    }

  return (
    <div>
      <TablaClientes />
    </div>
  )
}

export default Clientes
