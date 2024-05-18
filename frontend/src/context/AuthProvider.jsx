import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axiosClient('/profile', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.error);
                setAuth({});
            }
        }
        authUser();
    }, []);

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };

export default AuthContext;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
