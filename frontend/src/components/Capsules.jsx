// import React from "react";
// import Capsule from "./Capsule";
// import { Skeleton } from "./ui/skeleton";

// function Capsules({ capsules = [], loading, setCapsules }) {
//   if (loading) {
//     return (
//       <div className="grid grid-cols-3 mt-10 gap-y-6">
//         {Array.from({ length: 6 }).map((_, idx) => (
//           <CapsuleSkeleton key={idx} />
//         ))}
//       </div>
//     );
//   }

//   if (capsules.length === 0) {
//     return (
//       <div className="mt-10 text-center text-gray-500">
//         No capsules created yet.
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-3 mt-10 gap-y-6">
//       {Array.isArray(capsules) &&
//         capsules.map((item) => (
//           <Capsule
//             key={item._id}
//             id={item._id}
//             type={item.type}
//             body={item.body}
//             file={item.file}
//             openDate={item.openDate}
//             openTime={item.openTime}
//             created_At={item.createdAt}
//             onDelete={(id) =>
//               setCapsules((prev) => prev.filter((c) => c._id !== id))
//             }
//           />
//         ))}
//     </div>
//   );
// }

// export default Capsules;

// function CapsuleSkeleton() {
//   return (
//     <div className=" w-100 border rounded-full p-4 flex flex-col items-center gap-4 shadow-lg bg-white animate-pulse">
//       {/* Title */}
//       <Skeleton className="h-6 w-32 rounded-md" />

//       <Skeleton className="h-6 w-56 rounded-md" />

//       <Skeleton className="h-6 w-56 rounded-md" />

//       {/* Countdown */}
//       <Skeleton className="h-8 w-72 rounded-md" />

//       {/* Button  */}
//       <Skeleton className="h-10 w-24 rounded-md" />
//     </div>
//   );
// }

import React from "react";
import Capsule from "./Capsule";
import { Skeleton } from "./ui/skeleton";

function Capsules({ capsules = [], loading, setCapsules }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <CapsuleSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (capsules.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        No capsules created yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
      {Array.isArray(capsules) &&
        capsules.map((item) => (
          <Capsule
            key={item._id}
            id={item._id}
            type={item.type}
            body={item.body}
            file={item.file}
            openDate={item.openDate}
            openTime={item.openTime}
            created_At={item.createdAt}
            onDelete={(id) =>
              setCapsules((prev) => prev.filter((c) => c._id !== id))
            }
          />
        ))}
    </div>
  );
}

export default Capsules;

function CapsuleSkeleton() {
  return (
    <div className="w-full max-w-xs sm:max-w-sm mx-auto border rounded-full p-4 flex flex-col items-center gap-4 shadow-lg bg-white animate-pulse">
      <Skeleton className="h-6 w-32 rounded-md" />
      <Skeleton className="h-6 w-56 rounded-md" />
      <Skeleton className="h-6 w-56 rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>
  );
}
