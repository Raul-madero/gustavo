import { useEffect, useState } from "react";

const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
            setUser(user);
        }
    }, []);
    return { isLoggedIn, user };
}

export default useIsLoggedIn;