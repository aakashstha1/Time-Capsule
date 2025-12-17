import Capsules from "@/components/Capsules";
import MediaPicker from "@/components/MediaPicker";
import React from "react";

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <MediaPicker />
      <Capsules />
    </div>
  );
}

export default HomePage;
