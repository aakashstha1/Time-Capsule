import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { PacmanLoader } from "react-spinners";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [dialogType, setDialogType] = useState(null); // "login" | "signup"
  const { login, loading } = useAuth();
  // const API_URL = `${import.meta.env.VITE_API_URL}`;
  const API_URL = "/api/v1";

  const initialForm = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const isLogin = dialogType === "login";
  const isSignup = dialogType === "signup";

  const switchDialog = (type) => {
    setDialogType(type);
    setFormData(initialForm);
  };

  const handleLoginOpen = () => {
    switchDialog("login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        navigate("/capsules");
      } else {
        const res = await axios.post(
          `${API_URL}/auth/signup`,
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true },
        );
        toast.success(res?.data?.message || "Signup successful");
        return;
      }
      switchDialog("login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");

      console.error(err.message);
    }
  };

  return (
    <div className="w-1/2 h-screen flex flex-col justify-center items-center bg-white border rounded-tr-full rounded-br-full p-10 shadow-lg">
      {/* Welcome Text */}
      <div className="text-5xl md:text-6xl font-extrabold text-center space-y-2 mb-10 animate-fade-in">
        <h1>Welcome</h1>
        <h1>to</h1>
        <h1>Time Capsule</h1>
      </div>

      {/* Login/Signup Button */}
      <Button
        variant="outline"
        className="text-xl font-semibold px-10 py-6 hover:bg-purple-600 hover:text-white transition-all duration-300"
        onClick={handleLoginOpen}
      >
        Login / Signup
      </Button>

      {/* Dialog */}
      <Dialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="sm:max-w-md w-full rounded-xl bg-white p-6 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isLogin ? "Login" : "Signup"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              {isLogin
                ? "Enter your credentials to login."
                : "Create an account to get started."}
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="grid gap-1">
                <Label>Username</Label>
                <Input
                  type="text"
                  value={formData.username}
                  placeholder="Enter username"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            )}

            <div className="grid gap-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="grid gap-1">
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password}
                placeholder="********"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Button
                type="submit"
                className="bg-purple-600 text-white hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <PacmanLoader size={10} color="yellow" />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Signup"
                )}
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </form>

          {/* Switch Link */}
          <p className="text-sm text-center mt-4 text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="cursor-pointer text-purple-600 hover:underline"
              onClick={() => switchDialog(isLogin ? "signup" : "login")}
            >
              {isLogin ? "Signup" : "Login"} here
            </span>
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
