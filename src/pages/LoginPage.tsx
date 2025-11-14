import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      login("admin");
      navigate("/admin");
      return;
    }

    if (email === "coun@gmail.com" && password === "coun123") {
      login("counsellor");
      navigate("/counsellor");
      return;
    }

    if (email && password) {
      login("patient");
      navigate("/");
      return;
    }

    toast({
      title: "Login failed",
      description: "Invalid credentials",
      variant: "destructive",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>

        <Input placeholder="Email" className="mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" className="mb-4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button className="w-full" type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
