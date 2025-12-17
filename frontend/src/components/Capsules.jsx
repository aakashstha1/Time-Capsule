import React from "react";
import Capsule from "./Capsule";

function Capsules() {
  const data = [
    {
      id: 1,
      type: "Text",
      body: "Hello World",
      openDate: "2026-01-01",
      openTime: "10:30:00 AM",
      created_At: "2023-01-01 12:30:11 PM",
    },
    {
      id: 2,
      type: "Text",
      body: "Hello World",
      openDate: "2026-01-01",
      openTime: "10:30:00 AM",
      created_At: "2023-01-01 12:30:11 PM",
    },
    {
      id: 3,
      type: "Text",
      body: "Hello World",
      openDate: "2025-12-17",
      openTime: "1:23:00 PM",
      created_At: "2023-01-01 12:30:11 PM",
    },
  ];
  return (
    <div className="grid grid-cols-5 gap-2 mt-10">
      {data.map((item, idx) => (
        <Capsule
          key={idx}
          id={item.id}
          type={item.type}
          body={item.body}
          openDate={item.openDate}
          openTime={item.openTime}
          created_At={item.created_At}
        />
      ))}
    </div>
  );
}

export default Capsules;
