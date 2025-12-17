export const validateBodyByType = (type, body, file) => {
  switch (type) {
    case "text":
      if (!body || typeof body !== "string") {
        return "Text body is required";
      }
      return null;

    case "image":
    case "video":
    case "audio":
    case "file":
      if (!file) {
        return "File is required for this content type";
      }
      return null;

    default:
      return "Invalid content type";
  }
};
