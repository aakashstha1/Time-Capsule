import { File, Image, Music, Type, Video } from "lucide-react";
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Form from "./Form";
import { Separator } from "./ui/separator";

function MediaPicker() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);

  const handleClick = (name) => {
    setType(name);
    setOpen(true);
  };
  const handleClose = () => {
    setType(null);
    setOpen(false);
  };

  const options = [
    {
      name: "Text",
      icon: Type,
      bg: "bg-blue-600",
      text: "text-blue-600",
    },
    {
      name: "Audio",
      icon: Music,
      bg: "bg-purple-600",
      text: "text-purple-600",
    },
    { name: "Video", icon: Video, bg: "bg-red-600", text: "text-red-600" },
    { name: "Image", icon: Image, bg: "bg-green-600", text: "text-green-600" },
    { name: "File", icon: File, bg: "bg-amber-600", text: "text-amber-600" },
  ];

  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-3xl font-bold text-center">
        What do you want to Seal?
      </h1>
      <div className="flex items-center justify-center gap-10 mt-20 flex-wrap">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <Tooltip key={opt.name}>
              <TooltipTrigger>
                <div
                  onClick={() => handleClick(opt.name)}
                  className="group relative w-16 h-16 rounded-full cursor-pointer border-2 border-gray-200 overflow-hidden transition-all duration-300 flex items-center justify-center"
                >
                  {/* Background circle animation */}
                  <div
                    className={`${opt.bg} absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full`}
                  ></div>

                  {/* Icon */}
                  <Icon
                    size={28}
                    className={`${opt.text} relative z-10 group-hover:text-white transition-colors duration-300`}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{opt.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Open Form */}
      {open && <Form type={type} open={open} onClose={handleClose} />}
      <Separator className="mt-10" />
    </div>
  );
}

export default MediaPicker;
