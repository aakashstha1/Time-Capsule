export const DateTimeValidator = (date, time) => {
  if (!date || !time) {
    return { valid: false, message: "Date and time are required" };
  }
  // console.log(date, time);

  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute, second] = time.split(":").map(Number);

  // 👇 LOCAL datetime (this fixes the bug)
  const inputDateTime = new Date(year, month - 1, day, hour, minute, second);

  if (isNaN(inputDateTime.getTime())) {
    return { valid: false, message: "Invalid date or time" };
  }

  const now = new Date();

  // Date can be same day, but time must be in future
  if (inputDateTime <= now) {
    // console.log(inputDateTime, now);
    return {
      valid: false,
      message: "Selected date & time must be in the future",
    };
  }

  return { valid: true };
};
