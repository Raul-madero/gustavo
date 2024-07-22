'use client'
import TablaClientes from "@/app/components/admin/TablaClientes"
import useIsLoggedIn from "@/hooks/useIsLoggedIn"

const Clientes = () => {  
    const {user, isLoggedIn} = useIsLoggedIn()

  return (
    <div>
      <TablaClientes />
    </div>
  )
}

export default Clientes
