import { useState } from "react";
import { register, login } from "./api";

function App() {
    const [mode, setMode] = useState("register");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const data = mode === "register"
                ? await register(email, password)
                : await login(email, password);

            localStorage.setItem("aura_token", data.token);
            setUser(data.user);

        } catch (err) {
            setError(err.message);
        }
    }

    if (user) {
        return (
            <main>
                <h1>Welcome to AURA</h1>
                <h2>Your identity</h2>

                <p>Username: @{user.username}</p>
                <p>Private ID: {user.id}</p>

                <button onClick={() => {
                    localStorage.removeItem("aura_token");
                    setUser(null);
                }}>
                    Logout
                </button>
            </main>
        );
    }

    return (
        <main>
            <h1>AURA</h1>
            <p>A safe space to be yourself.</p>

            <h2>
                {mode === "register" ? "Create account" : "Welcome back"}
            </h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password (minimum 12 characters)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    {mode === "register" ? "Join AURA" : "Login"}
                </button>
            </form>

            {error && <p>{error}</p>}

            <button onClick={() => {
                setMode(mode === "register" ? "login" : "register");
                setError("");
            }}>
                {mode === "register"
                    ? "Already have an account? Login"
                    : "New to AURA? Register"}
            </button>
        </main>
    );
}

export default App;
