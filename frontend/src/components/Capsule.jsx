import { LockKeyhole, MoreVertical, UnlockKeyhole } from "lucide-react";
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

function Capsule({ type, body, openDate, openTime, created_At }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
          className={`relative w-56 border rounded-lg p-4 flex flex-col items-center gap-6 shadow-lg bg-white transition
        ${!isOpen ? "select-none cursor-not-allowed " : ""}
      `}
        >
          <h1 className="text-xl font-bold">{type} Capsule</h1>

          {/* Lock / Unlock Button */}
          <Button
            className={`w-32 flex items-center justify-center gap-2 ${
              isOpen ? "bg-green-600 hover:bg-green-700" : "cursor-not-allowed"
            }`}
            disabled={!isOpen}
            onClick={() => isOpen && setOpenContent(true)}
          >
            {isOpen ? <UnlockKeyhole /> : <LockKeyhole />}
            {isOpen ? "Open" : "Sealed"}
          </Button>

          {/* Countdown */}
          {!isOpen && timeLeft && (
            <div className="text-red-500 text-lg font-bold text-center">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </div>
          )}

          {isOpen && (
            <h2 className="text-green-600 text-lg font-bold">Capsule Opened</h2>
          )}

          {/* Dates Info */}
          <div className="grid grid-cols-2 gap-2 w-full text-sm text-gray-600">
            <div className="flex flex-col">
              <span className="font-semibold">Sealed At</span>
              <span>{created_At}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Opens On</span>
              <span>
                {openDate} {openTime}
              </span>
            </div>
          </div>

          {/* Dropdown Menu for Open Capsules */}
          {isOpen && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2 cursor-pointer focus:outline-none">
                  <MoreVertical size={15} />
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
    <div className="relative w-56 border rounded-lg p-4 flex flex-col items-center gap-6 shadow-lg bg-white animate-pulse">
      {/* Title */}
      <Skeleton className="h-6 w-32 rounded-md" />

      {/* Lock/Unlock Button */}
      <Skeleton className="h-10 w-32 rounded-md" />

      {/* Countdown / Status */}
      <Skeleton className="h-5 w-24 rounded-md" />

      {/* Dates Info */}
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-16 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
