"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

function Form({ type, open, onClose }) {
  const [date, setDate] = useState(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [time, setTime] = useState("00:00:00");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    const payload = {
      type: type.toLowerCase(),
      openDate: date.toISOString().split("T")[0], // YYYY-MM-DD
      openTime: time, // HH:mm:ss
      body: type === "Text" ? text : file,
    };

    console.log("Payload:", payload);

    // Close the dialog
    onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{type}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Date and Time Picker */}
          <div className="flex gap-4">
            {/* Date Picker */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="date-picker" className="px-1">
                Date
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(d) => {
                      setDate(d);
                      setCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Picker */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="time-picker" className="px-1">
                Time
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>

          {/* Form Inputs based on type */}
          {type === "Text" && (
            <div className="grid gap-3">
              <Label htmlFor="text-content">Text</Label>
              <Textarea
                placeholder="Enter your message"
                name="message"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}
          {["Audio", "Video", "Image", "File"].includes(type) && (
            <div className="grid gap-3">
              <Label htmlFor="file-upload">
                {type === "File" ? "Upload File" : `Upload ${type}`}
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept={
                  type === "Audio"
                    ? "audio/*"
                    : type === "Video"
                    ? "video/*"
                    : type === "Image"
                    ? "image/*"
                    : "*"
                }
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Form;
