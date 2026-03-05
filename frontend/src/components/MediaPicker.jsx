import { File, Image, Music, Type, Video } from "lucide-react";
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Form from "./Form";
import { Separator } from "./ui/separator";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function MediaPicker({ onCapsuleAdded }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
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

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const options = [
    { name: "text", icon: Type, bg: "bg-blue-600", text: "text-blue-600" },
    {
      name: "audio",
      icon: Music,
      bg: "bg-purple-600",
      text: "text-purple-600",
    },
    { name: "video", icon: Video, bg: "bg-red-600", text: "text-red-600" },
    { name: "image", icon: Image, bg: "bg-green-600", text: "text-green-600" },
    { name: "file", icon: File, bg: "bg-amber-600", text: "text-amber-600" },
  ];

  return (
    <div className="flex flex-col mt-8 sm:mt-10 px-4 sm:px-0">
      {/* Top bar: title + logout */}
      <div className="flex items-center justify-between">
        <div className="w-10" /> {/* spacer to center the title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          What do you want to Seal?
        </h1>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={handleLogout}
              className="rounded-full hover:bg-gray-200 h-10 w-10 flex items-center justify-center cursor-pointer flex-shrink-0"
            >
              <ImExit size={20} color="red" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center justify-center gap-6 sm:gap-10 mt-10 sm:mt-20 flex-wrap">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <Tooltip key={opt.name}>
              <TooltipTrigger>
                <div
                  onClick={() => handleClick(opt.name)}
                  className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full cursor-pointer border-2 border-gray-200 overflow-hidden transition-all duration-300 flex items-center justify-center"
                >
                  <div
                    className={`${opt.bg} absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full`}
                  ></div>
                  <Icon
                    size={24}
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

      {open && (
        <Form
          type={type}
          open={open}
          onClose={handleClose}
          onCapsuleAdded={onCapsuleAdded}
        />
      )}
      <Separator className="mt-8 sm:mt-10" />
    </div>
  );
}

export default MediaPicker;
