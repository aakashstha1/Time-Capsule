import React, {  useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

function Login() {
  const [dialogType, setDialogType] = useState(null); // "login" | "signup"

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

  return (
    <div className="w-1/2 bg-white border rounded-tr-full rounded-br-full my-5 grid items-center justify-center">
      <div className="text-6xl font-bold flex flex-col items-center space-y-4">
        <h1 className="">Welcome </h1>
        <h1>To </h1>
        <h1>Time Capsule </h1>
      </div>
      <Button
        variant={"link"}
        className="text-xl font-semibold"
        onClick={handleLoginOpen}
      >
        Login/Signup
      </Button>

      {/* Dialog */}
      <Dialog
        open={!!dialogType}
        onOpenChange={() => {
          setDialogType(null);
        }}
      >
        <DialogContent className="sm:max-w-106">
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Signup"}</DialogTitle>
            <DialogDescription>
              {isLogin
                ? "Enter the credentials to login."
                : "Enter the credentials to signup."}
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <form className="grid gap-4">
            {isSignup && (
              <div className="grid gap-3">
                <Label>Username</Label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            )}

            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{isLogin ? "Login" : "Signup"}</Button>
            </DialogFooter>
          </form>

          {/* Switch */}
          <p className="text-sm text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="cursor-pointer hover:text-blue-600 hover:underline"
              onClick={() => switchDialog(isLogin ? "signup" : "login")}
            >
              Click to {isLogin ? "Signup" : "Login"}
            </span>
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
