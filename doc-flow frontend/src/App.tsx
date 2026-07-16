import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Editor from "./pages/Editor.tsx";
import SharedDocuments from "./pages/SharedDocuments";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editor/:id" element={<Editor />} />
                <Route path="/shared" element={<SharedDocuments />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;