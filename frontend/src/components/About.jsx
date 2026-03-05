// import React from "react";
// import { Image, Music, Video, Type } from "lucide-react";

// function About() {
//   const features = [
//     { name: "Image", icon: <Image size={24} /> },
//     { name: "Audio", icon: <Music size={24} /> },
//     { name: "Video", icon: <Video size={24} /> },
//     { name: "Message", icon: <Type size={24} /> },
//   ];

//   return (
//     <div className="w-1/2 h-screen flex items-center justify-center text-white p-10">
//       <div className="flex flex-col space-y-10 w-full">
//         {/* Heading */}
//         <h1 className="text-4xl font-extrabold tracking-tight mb-6 text-center">
//           What you can do here?
//         </h1>

//         {/* Feature list */}
//         <div className="flex flex-col gap-4">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-md"
//             >
//               <div className="text-amber-400">{feature.icon}</div>
//               <span className="text-lg font-semibold">Seal {feature.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;

import React from "react";
import { Image, Music, Video, Type } from "lucide-react";

function About() {
  const features = [
    { name: "Image", icon: <Image size={24} /> },
    { name: "Audio", icon: <Music size={24} /> },
    { name: "Video", icon: <Video size={24} /> },
    { name: "Message", icon: <Type size={24} /> },
  ];

  return (
    <div className="w-full sm:w-3/4 md:w-1/2 min-h-screen flex items-center justify-center text-white p-6 sm:p-10 mx-auto md:mx-0">
      <div className="flex flex-col space-y-8 sm:space-y-10 w-full">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6 text-center">
          What you can do here?
        </h1>

        {/* Feature list */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-md"
            >
              <div className="text-amber-400">{feature.icon}</div>
              <span className="text-base sm:text-lg font-semibold">
                Seal {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
