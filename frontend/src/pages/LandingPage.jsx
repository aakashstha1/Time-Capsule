import About from "@/components/About";
import Login from "@/components/Login";
import React from "react";

function LandingPage() {
  return (
    <div className="flex min-h-screen bg-purple-500">
      <Login />
      <About />
    </div>
  );
}

export default LandingPage;
