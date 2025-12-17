import React from "react";

function About() {
  return (
    <div className="w-1/2 h-full bg-purple-500 ">
      <div className="flex flex-col space-y-4 mt-10 pl-20">
        <h1 className="text-4xl font-bold">What you can do here?</h1>
        <div className="flex flex-col gap-2 text-lg font-semibold">
          <ul className="list-disc list-inside">
            <li>Store Image</li>
            <li>Store Audio</li>
            <li>Store Draw</li>
            <li>Store Video</li>
            <li>Store Message</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
