'use client'
import Image from "next/image";
import LoginForm from "../components/login/LoginForm";
import logo from "@/assets/img/logo.svg"
import logoOscuro from "@/assets/img/logoNegro.svg"
import { useEffect, useState } from "react";

const Login = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }
    }, []);
    
    return (
        <div className="max-w-md mx-auto flex flex-col items-center justify-center mt-10">
            <Image src={darkMode ? logo : logoOscuro} alt="Login" width={400} height={200} />
            <LoginForm />
        </div>
    );
}

export default Login;