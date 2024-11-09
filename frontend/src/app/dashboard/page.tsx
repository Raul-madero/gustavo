'use client'
import Link from "next/link";
import ClienteNombre from "../components/admin/ClienteNombre";
import Titles from "../components/ui/Titles";

const Dashboard = () => {
    return (
        <div>
            <ClienteNombre />
            <Titles title='Descarga aqui tus documentos' />
            <div className='w-10/12 mx-auto flex justify-between my-10'>
                <Link href="/admin/usuarios" className='text-white font-bold text-center flex justify-center items-center bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>ODC</Link>
                <Link href="/admin/clientes" className='text-white font-bold text-center flex justify-center items-center bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>CSF</Link>
                <Link href="/admin/colaboradores" className='text-white font-bold text-center flex justify-center items-center bg-emerald-400 w-48 h-16 rounded-xl shadow-xl'>RFC</Link>
            </div>
        <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;