import { getUserByEmail } from "@/lib/features/userSlice";
import { AppDispatch } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();

    const getUser = async (email: string) => {
        const user = await dispatch(getUserByEmail(email));
        if(user.payload.id) {
            setUser(user.payload.nombre + " " + user.payload.apellido);
            setEmail(user.payload.email)
        }else {
            return "El usuario no existe";
        }
    }

    useEffect(() => {
        const usuario = sessionStorage.getItem('user');
        if (usuario) {
            setIsLoggedIn(true);
            getUser(usuario);
        }else {
            setIsLoggedIn(false);
            setEmail("");
            window.location.href = '/login';
        }
    }, []);
    return { isLoggedIn, email, user };
}

export default useIsLoggedIn;