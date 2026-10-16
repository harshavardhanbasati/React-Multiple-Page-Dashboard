import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        try {
            await register(name, email, password);
            navigate("/dashboard");
        }
        catch (error) {
            setError(error instanceof Error ? error.message : "Registration failed.");
        }
    }
    return (_jsx("div", { className: "auth-page", children: _jsxs("div", { className: "auth-card", children: [_jsxs("div", { className: "brand auth-brand", children: [_jsx("span", { className: "brand-icon", children: _jsx(Sparkles, { size: 19 }) }), _jsxs("span", { children: ["orbit", _jsx("span", { className: "brand-dot", children: "." })] })] }), _jsx("p", { className: "eyebrow", children: "GET STARTED" }), _jsx("h1", { children: "Create your account" }), _jsx("p", { className: "muted", children: "Create a demo account to explore the dashboard." }), _jsxs("form", { onSubmit: handleSubmit, className: "auth-form", children: [_jsxs("label", { children: ["Full name", _jsx("input", { value: name, onChange: (event) => setName(event.target.value), required: true })] }), _jsxs("label", { children: ["Email address", _jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true })] }), _jsxs("label", { children: ["Password", _jsx("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), minLength: 4, required: true })] }), error && _jsx("p", { className: "form-error", children: error }), _jsxs("button", { className: "primary-button full-width", type: "submit", children: ["Create account ", _jsx(ArrowRight, { size: 16 })] })] }), _jsxs("p", { className: "auth-switch", children: ["Already registered? ", _jsx(Link, { to: "/login", children: "Sign in" })] })] }) }));
}
