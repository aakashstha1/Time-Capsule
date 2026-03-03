import { CalendarClock, LockKeyhole, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { File, Image, Music, Type, Video } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

function Capsule({
  id,
  type,
  body,
  file,
  openDate,
  openTime,
  created_At,
  onDelete,
}) {
  // const API_URL = `${import.meta.env.VITE_API_URL}`;
  const API_URL = "/api/v1";


  const [timeLeft, setTimeLeft] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openCapsule, setOpenCapsule] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const typeIcons = {
    file: <File size={18} color="orange" />,
    image: <Image size={18} color="green" />,
    music: <Music size={18} color="purple" />,
    text: <Type size={18} color="blue" />,
    video: <Video size={18} color="red" />,
  };

  useEffect(() => {
    const targetDateTime = new Date(`${openDate} ${openTime}`).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetDateTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setIsOpen(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [openDate, openTime]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await axios.delete(`${API_URL}/capsule/${id}`, {
        withCredentials: true,
      });
      toast.success(res?.data?.message || "Capsule deleted successfully");
      onDelete(id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Capsule deletion failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`relative w-100 border-5 border-gray-400 bg-black/90 rounded-full shadow-lg flex flex-col items-center pt-8 pb-5 gap-3  ${
        !isOpen ? "select-none cursor-not-allowed " : ""
      }`}
    >
      <div className="flex gap-2 items-center text-white text-xl font-bold">
        Type: <span>{typeIcons[type]}</span>
        <span>{type?.charAt(0).toUpperCase() + type?.slice(1)}</span>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-white">Sealed On:</h2>
        <LockKeyhole size={20} className="text-orange-400" />
        <span className="font-semibold text-orange-400">
          {new Date(created_At).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
          {" | "}
          {new Date(created_At).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-white">Open On:</h2>
        <CalendarClock size={20} className="text-green-500" />
        <span className="font-semibold text-green-500">
          {new Date(openDate).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
          {" | "}
          {formatTime24to12(openTime)}
        </span>
      </div>
      {/* Countdown */}
      <div className="text-green-500 text-2xl font-bold text-center">
        {!isOpen && timeLeft ? (
          <div className="text-red-500">
            {timeLeft.days}
            <span className="text-lg text-white">d</span> {timeLeft.hours}
            <span className="text-lg text-white">h</span> {timeLeft.minutes}
            <span className="text-lg text-white">m</span> {timeLeft.seconds}
            <span className="text-lg text-white">s</span>
          </div>
        ) : (
          <div className="text-green-500">
            00<span className="text-lg text-white">d</span> 00
            <span className="text-lg text-white">h</span> 00
            <span className="text-lg text-white">m</span> 00
            <span className="text-lg text-white">s</span>
          </div>
        )}
      </div>

      <div>
        <Button
          className={`w-32 flex items-center justify-center gap-2 ${
            isOpen
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-500 cursor-not-allowed hover:bg-red-500"
          }`}
          onClick={() => isOpen && setOpenCapsule(true)}
        >
          {!isOpen && <LockKeyhole className="text-amber-300" />}
          {isOpen ? "OPEN" : "SEALED"}
        </Button>
      </div>
      {/* Dropdown Menu for Open Capsules */}
      {isOpen && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-2 cursor-pointer focus:outline-none">
              <MoreHorizontal size={20} color="white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem onSelect={() => setDeleteDialogOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Capsule</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this capsule? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  variant={"destructive"}
                  onClick={handleDelete}
                  diasbled={deleting}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}

      {/* Dialog to View Capsule Content */}
      {isOpen && (
        <Dialog open={openCapsule} onOpenChange={() => setOpenCapsule(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {type?.charAt(0).toUpperCase() + type?.slice(1)} Capsule
              </DialogTitle>
              <DialogDescription>
                {type === "text" && (
                  <div className="text-gray-800 font-medium">{body}</div>
                )}
                {file && file.url && (
                  <>
                    {type === "image" && <img src={file.url} alt="Image" />}
                    {type === "video" && <video src={file.url} controls />}
                    {type === "audio" && <audio src={file.url} controls />}
                    {type === "file" && (
                      <>
                        {file.url.endsWith(".pdf") ? (
                          <iframe
                            src={file.url}
                            className="w-full h-[500px]"
                            title="PDF Preview"
                          />
                        ) : (
                          <p className="text-gray-800">
                            Cannot preview this file.{" "}
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Open in new tab
                            </a>
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button variant="outline" className="mt-2">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Capsule;

function formatTime24to12(time24) {
  if (!time24) return "";
  const [hours, minutes, seconds] = time24.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(parseInt(seconds, 10));

  return date.toLocaleTimeString("en-US", { hour12: true });
  // Output: "2:30:00 PM"
}
