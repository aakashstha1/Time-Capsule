import {
  CalendarClock,
  LockKeyhole,
  MoreHorizontal,
  MoreVertical,
  UnlockKeyhole,
} from "lucide-react";
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
import { Skeleton } from "./ui/skeleton";
import { File, Image, Music, Type, Video } from "lucide-react";
import { Separator } from "./ui/separator";

function Capsule({ type, body, openDate, openTime, created_At }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const typeIcons = {
    file: <File size={18} color="yellow" />,
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

  return (
    <>
      {loading ? (
        <CapsuleSkeleton />
      ) : (
        <div
          className={`relative w-[400px] border-5 border-gray-500 rounded-full shadow-lg flex flex-col items-center pt-8 pb-5 gap-3  ${
            !isOpen ? "select-none cursor-not-allowed " : ""
          }`}
        >
          <div className="flex gap-2 items-center text-xl font-bold">
            Type: <span>{typeIcons[type]}</span>
            <span>{type?.charAt(0).toUpperCase() + type?.slice(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold">Sealed On:</h2>
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
            <h2 className="font-bold">Open On:</h2>
            <CalendarClock size={20} className="text-green-500" />
            <span className="font-semibold text-green-500">
              {new Date(openDate).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
              {" | "}
              {openTime}
            </span>
          </div>
          {/* Countdown */}
          <div className="text-green-500 text-2xl font-bold text-center">
            {!isOpen && timeLeft ? (
              <div className="text-red-500">
                {timeLeft.days}
                <span className="text-lg text-gray-900">d</span>{" "}
                {timeLeft.hours}
                <span className="text-lg text-gray-900">h</span>{" "}
                {timeLeft.minutes}
                <span className="text-lg text-gray-900">m</span>{" "}
                {timeLeft.seconds}
                <span className="text-lg text-gray-900">s</span>
              </div>
            ) : (
              <div className="text-green-500">
                00<span className="text-lg text-gray-900">d</span> 00
                <span className="text-lg text-gray-900">h</span> 00
                <span className="text-lg text-gray-900">m</span> 00
                <span className="text-lg text-gray-900">s</span>
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
              onClick={() => isOpen && setOpenContent(true)}
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
                  <MoreHorizontal size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuItem onSelect={() => setDeleteDialogOpen(true)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
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
                    <Button variant={"destructive"}>Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}

          {/* Dialog to View Capsule Content */}
          {isOpen && (
            <Dialog
              open={openContent}
              onOpenChange={() => setOpenContent(false)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{type} Capsule</DialogTitle>
                  <DialogDescription>{body}</DialogDescription>
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
      )}
    </>
  );
}

export default Capsule;

function CapsuleSkeleton() {
  return (
    <div className=" w-[400px] border rounded-full p-4 flex flex-col items-center gap-4 shadow-lg bg-white animate-pulse">
      {/* Title */}
      <Skeleton className="h-6 w-32 rounded-md" />

      <Skeleton className="h-6 w-56 rounded-md" />

      <Skeleton className="h-6 w-56 rounded-md" />

      {/* Countdown */}
      <Skeleton className="h-8 w-72 rounded-md" />

      {/* Button  */}
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>
  );
}
