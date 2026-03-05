import About from "@/components/About";
import Login from "@/components/Login";
import React from "react";

function LandingPage() {
  return (
    <div className="flex flex-col md:flex-row bg-linear-to-b from-purple-600 to-purple-400">
      <Login />
      <About />
    </div>
  );
}

export default LandingPage;
