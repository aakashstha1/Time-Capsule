import Capsules from "@/components/Capsules";
import MediaPicker from "@/components/MediaPicker";
import React, { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const API_URL = `${import.meta.env.VITE_API_URL}`;

  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/capsule`, {
        withCredentials: true,
      });
      setCapsules(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <MediaPicker
        onCapsuleAdded={(newCapsule) =>
          setCapsules((prev) => [newCapsule, ...prev])
        }
      />

      <Capsules
        capsules={capsules}
        loading={loading}
        setCapsules={setCapsules}
      />
    </div>
  );
}

export default HomePage;
