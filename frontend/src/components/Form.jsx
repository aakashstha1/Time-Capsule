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
import { toast } from "sonner";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

function Form({ type, open, onClose, onCapsuleAdded }) {
  // const API_URL = `${import.meta.env.VITE_API_URL}`;
  const API_URL = "/api/v1";

  const [date, setDate] = useState(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [time, setTime] = useState("00:00:00");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(date, time);

  const handleSubmit = async () => {
    if (!date || !time) {
      toast.error("Please select date and time");
      return;
    }

    const formData = new FormData();
    formData.append("type", type.toLowerCase());

    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0"); // month is 0-indexed
    const dd = date.getDate().toString().padStart(2, "0");

    formData.append("openDate", `${yyyy}-${mm}-${dd}`); // local date
    formData.append("openTime", time); // keep time string
    if (type.toLowerCase() === "text") {
      formData.append("body", text);
    } else {
      formData.append("file", file);
    }
    // Then send via axios
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/capsule/add`, formData, {
        withCredentials: true,
      });
      toast.success(res?.data?.message || "Capsule added successfully");
      // console.log(res?.data);
      onCapsuleAdded(res?.data?.capsule);
    } catch (err) {
      toast.error(err.response?.data?.message || "Capsule addition failed");
    } finally {
      setLoading(false);
    }
    onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {type?.charAt(0).toUpperCase() + type?.slice(1)}
          </DialogTitle>
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
          {type === "text" && (
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
          {["audio", "video", "image", "file"].includes(type) && (
            <div className="grid gap-3">
              <Label htmlFor="file-upload">
                {type === "file" ? "Upload File" : `Upload ${type}`}
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept={
                  type === "audio"
                    ? "audio/*"
                    : type === "video"
                    ? "video/*"
                    : type === "image"
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
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <PacmanLoader size={10} color="#fff" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Form;
