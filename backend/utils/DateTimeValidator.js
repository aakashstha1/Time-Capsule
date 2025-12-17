export const DateTimeValidator = (date, time) => {
  // console.log(date, time);
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/; // HH:mm:ss

  if (!date || !time) {
    return { valid: false, message: "Date and time are required" };
  }

  if (!dateRegex.test(date)) {
    return { valid: false, message: "Invalid date format (YYYY-MM-DD)" };
  }

  if (!timeRegex.test(time)) {
    return { valid: false, message: "Invalid time format (HH:mm:ss)" };
  }

  const inputDateTime = new Date(`${date}T${time}`);
  // console.log(inputDateTime);

  if (isNaN(inputDateTime.getTime())) {
    return { valid: false, message: "Invalid date or time" };
  }

  const now = new Date();
  if (inputDateTime <= now) {
    return {
      valid: false,
      message: "Selected date and time must be in the future",
    };
  }

  return { valid: true };
};
