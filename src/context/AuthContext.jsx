import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useEffect, useState } from "react";
import users from "../data/users.json";
export const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const savedUser = localStorage.getItem("orbit-user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            }
            catch {
                localStorage.removeItem("orbit-user");
            }
        }
        setLoading(false);
    }, []);
    function saveUser(nextUser) {
        // Store only the signed-in profile in this browser; never store the password here.
        localStorage.setItem("orbit-user", JSON.stringify(nextUser));
        setUser(nextUser);
    }
    async function login(email, password) {
        const matchedUser = users.find((candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase() && candidate.password === password);
        if (!matchedUser) {
            throw new Error("Email or password is incorrect. Check users.json or use Demo Login.");
        }
        const { id, name, email: profileEmail, role, city, phone, isDemo } = matchedUser;
        saveUser({ id, name, email: profileEmail, role, city, phone, isDemo });
    }
    function loginAsDemo() {
        const demoUser = users.find((candidate) => candidate.isDemo) ?? users[0];
        const { id, name, email, role, city, phone, isDemo } = demoUser;
        saveUser({ id, name, email, role, city, phone, isDemo });
    }
    async function register(_name, _email, _password) {
        throw new Error("To add a user, edit src/data/users.json and restart the development server.");
    }
    function logout() {
        localStorage.removeItem("orbit-user");
        setUser(null);
    }
    return (_jsx(AuthContext.Provider, { value: { user, loading, login, loginAsDemo, register, logout }, children: children }));
}
