'use client'
import TablaClientes from "@/app/components/admin/TablaClientes"
import useIsLoggedIn from "@/hooks/useIsLoggedIn"
import Link from "next/link"

const Clientes = () => {  
    const {user, isLoggedIn} = useIsLoggedIn()
    console.log(user)

  return (
    <div>
      <TablaClientes />
      {user === "r.madero.ramirez@gmail.com" ? <Link href='/admin' /> : null}
    </div>
  )
}

export default Clientes
