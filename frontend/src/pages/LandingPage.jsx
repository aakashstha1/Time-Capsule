import About from "@/components/About";
import Login from "@/components/Login";
import React from "react";

function LandingPage() {
  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-600 to-purple-400">
      <Login />
      <About />
    </div>
  );
}

export default LandingPage;
