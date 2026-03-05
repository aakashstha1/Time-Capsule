// import Capsules from "@/components/Capsules";
// import MediaPicker from "@/components/MediaPicker";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function HomePage() {
//   // const API_URL = `${import.meta.env.VITE_API_URL}`;
//   const API_URL = "/api/v1";

//   const [capsules, setCapsules] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchCapsules();
//   }, []);

//   const fetchCapsules = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/capsule`, {
//         withCredentials: true,
//       });
//       setCapsules(res.data.capsules);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto">
//       <MediaPicker
//         onCapsuleAdded={(newCapsule) =>
//           setCapsules((prev) => [newCapsule, ...prev])
//         }
//       />

//       <Capsules
//         capsules={capsules}
//         loading={loading}
//         setCapsules={setCapsules}
//       />
//     </div>
//   );
// }

// export default HomePage;

import Capsules from "@/components/Capsules";
import MediaPicker from "@/components/MediaPicker";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const API_URL = "/api/v1";
  // const API_URL = `${import.meta.env.VITE_API_URL}`;

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
      setCapsules(res.data.capsules);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10">
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
      <Footer />
    </div>
  );
}

export default HomePage;
