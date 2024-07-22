import { useEffect, useState } from "react";

const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    useEffect(() => {
        const usuario = sessionStorage.getItem('user');
        if (usuario) {
            setIsLoggedIn(true);
            setUser(usuario);
        }else {
            setIsLoggedIn(false);
            setUser("");
            window.location.href = '/login';
        }
    }, []);
    return { isLoggedIn, user };
}

export default useIsLoggedIn;