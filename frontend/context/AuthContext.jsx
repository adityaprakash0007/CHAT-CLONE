import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const socketRef = useRef(null);

    // SOCKET
    const connectSocket = (userData) => {
        if (!userData || socketRef.current) return;

        const newSocket = io(backendUrl, {
            query: { userId: userData._id },
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds);
        });
    };

    // CHECK AUTH
    const checkAuth = async () => {
        try {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) return;

            const { data } = await axios.get("/api/auth/check", {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            console.log(
                "CHECK AUTH ERROR:",
                error.response?.data || error.message
            );

            // Only log out if the token is actually rejected
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                setToken(null);
                setAuthUser(null);
                delete axios.defaults.headers.common["Authorization"];
            }
        } finally {
            setIsCheckingAuth(false);
        }
    };

    // LOGIN / SIGNUP
    const login = async (state, credentials) => {
        try {
            const { data } = await axios.post(
                `/api/auth/${state}`,
                credentials
            );

            if (data.success) {
                setAuthUser(data.userData);
                setToken(data.token);

                axios.defaults.headers.common["Authorization"] =
                    `Bearer ${data.token}`;

                localStorage.setItem("token", data.token);

                connectSocket(data.userData);

                toast.success(data.message);

                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            console.log(
                "LOGIN/SIGNUP ERROR:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                    error.message ||
                    "Something went wrong"
            );

            return false;
        }
    };

    // LOGOUT
    const logout = async () => {
        localStorage.removeItem("token");

        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);

        delete axios.defaults.headers.common["Authorization"];

        socketRef.current?.disconnect();
        socketRef.current = null;
        setSocket(null);

        toast.success("Logged out successfully");
    };

    // UPDATE PROFILE
    const updateProfile = async (body) => {
        try {
            const storedToken = localStorage.getItem("token");

            const { data } = await axios.put(
                "/api/auth/update-profile",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );

            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            console.log(
                "UPDATE PROFILE ERROR:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                    error.message ||
                    "Profile update failed"
            );

            return false;
        }
    };

    // WHEN TOKEN CHANGES
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            checkAuth();
        } else {
            setIsCheckingAuth(false);
        }
    }, [token]);

    // CONTEXT VALUE
    const value = {
        axios,
        authUser,
        checkAuth,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
        isCheckingAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};