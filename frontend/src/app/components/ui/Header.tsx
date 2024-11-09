'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import logo from "@/assets/img/logo.svg"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/store"
import { signout } from "@/lib/features/authSlice"

const Header = () => {
    const [autenticado, setAutenticado] = useState(false)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const handleClick = () => {
      if (screen.width < 768) {
        setShow(!show)
      }else {
        setShow(false)
      }
    }

    const handleLogOut = () => {
      sessionStorage.removeItem("token")
      dispatch(signout())
      setAutenticado(false)
      window.location.href = "/"
    }

    useEffect(() => {
      if (sessionStorage.getItem("token")) {
        setAutenticado(true)
      }
      setShow(false)
    }, [])
    
    return (
        <header className="w-full flex items-center justify-between h-20 p-5 bg-gradient-to-r from-blue-800 via-sky-600 to-teal-400 dark:bg-gradient-to-r dark:from-slate-800 dark:via-slate-800 dark:to-gray-900 sticky top-0 z-50">
            <Link onClick={handleClick} href={"/"} >
                <Image src={logo} alt="Gustavo Ramirez Contador" width={200} height={100} />
            </Link>
            <div>
              <nav>
                <button onClick={handleClick} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
                </button>
                <div className={`${!show ? "hidden" : "absolute top-20 right-10 z-50 w-1/4"} w-full md:block md:w-auto`} id="navbar-default">
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 w-3/4 bg-slate-500 md:bg-transparent mx-auto">
                    <li>
                      <Link onClick={handleClick} href="/" className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Inicio</Link>
                    </li>
                    <li>
                      <Link onClick={handleClick} href="/nosotros" className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Nosotros</Link>
                    </li>
                    {/* <li>
                      <Link href="/servicios" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Servicios</Link>
                    </li> */}
                    <li>
                      <Link onClick={handleClick} href="/contacto" className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Contacto</Link>
                    </li>
                    <li>
                      <Link onClick={autenticado ? handleLogOut : handleClick} href={autenticado ? "/" : "/login"} className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">{autenticado ? "Cerrar Sesión" : "Iniciar Sesión"}</Link>
                    </li>
                    {autenticado && (
                      <li>
                        <Link onClick={handleClick} href="/admin" className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Admin</Link>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
        </header>
    )
}

export default Header