import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, KeyRound, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
export default function LoginPage() {
    const [email, setEmail] = useState("aarav.sharma@orbitdemo.in");
    const [password, setPassword] = useState("Orbit@123");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { login, loginAsDemo } = useAuth();
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await login(email, password);
            navigate("/dashboard");
        }
        catch (error) {
            setError(error instanceof Error ? error.message : "Login failed.");
        }
        finally {
            setSubmitting(false);
        }
    }
    function handleDemoLogin() {
        setError("");
        loginAsDemo();
        navigate("/dashboard");
    }
    return (_jsx("div", { className: "auth-page", children: _jsxs("div", { className: "auth-card", children: [_jsxs("div", { className: "brand auth-brand", children: [_jsx("span", { className: "brand-icon", children: _jsx(Sparkles, { size: 19 }) }), _jsxs("span", { children: ["orbit", _jsx("span", { className: "brand-dot", children: "." })] })] }), _jsx("p", { className: "eyebrow", children: "WELCOME BACK" }), _jsx("h1", { children: "Sign in to your workspace" }), _jsx("p", { className: "muted", children: "Use the sample credentials or enter a user from the local JSON file." }), _jsxs("form", { onSubmit: handleSubmit, className: "auth-form", children: [_jsxs("label", { children: ["Email address", _jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true, autoComplete: "username" })] }), _jsxs("label", { children: ["Password", _jsx("input", { type: "password", value: password, onChange: (event) => setPassword(event.target.value), required: true, autoComplete: "current-password" })] }), error && _jsx("p", { className: "form-error", children: error }), _jsxs("button", { className: "primary-button full-width", type: "submit", disabled: submitting, children: [submitting ? "Signing in..." : "Sign in with credentials", " ", _jsx(ArrowRight, { size: 16 })] })] }), _jsxs("div", { className: "demo-credentials", children: [_jsxs("div", { className: "settings-heading", children: [_jsx("span", { className: "stat-icon", children: _jsx(KeyRound, { size: 18 }) }), _jsxs("div", { children: [_jsx("h2", { children: "Demo account" }), _jsx("p", { className: "muted", children: "Indian sample profile" })] })] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " aarav.sharma@orbitdemo.in"] }), _jsxs("p", { children: [_jsx("strong", { children: "Password:" }), " Orbit@123"] }), _jsxs("button", { className: "secondary-button full-width demo-login-button", type: "button", onClick: handleDemoLogin, children: [_jsx(Eye, { size: 16 }), " Explore dashboard without credentials"] })] }), _jsx("p", { className: "demo-hint", children: "Demo project only: users.json is bundled into the frontend, so these credentials are not secure for a real application." })] }) }));
}
