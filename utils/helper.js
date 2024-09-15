import { supportedMimes } from "../config/filesystem.js";
import { v4 as uuidv4 } from "uuid";

export const imageValidator = (size, mime) => {

  if (bytesToMb(size) > 2) {
    return "Image size is less than 2mb";
  } else if (!supportedMimes.includes(mime)) {
    return "Image must be type png , jpeg , svg , gif, webp";
  }

  // if alll  is good 
  return null;

}


export const bytesToMb = (bytes) => {

  return bytes / (1024 * 1024);
}

// method to generate uuid unique

export const generateRandomNum = () => {
  return uuidv4();
}