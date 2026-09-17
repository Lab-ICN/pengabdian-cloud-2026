import crypto from "crypto";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import { reportUploadsDir } from "../config/storage";

const storage = multer.diskStorage({
  destination: reportUploadsDir,
  filename: (_req, file, cb) => {
    cb(
      null,
      `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`
    );
  },
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
];

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  console.log("Received file MIME type:", file.mimetype);

  const extname = path.extname(file.originalname).toLowerCase();
  const isAllowedExtension = [
    ".jpeg",
    ".jpg",
    ".png",
    ".mp4",
    ".mov",
    ".avi",
  ].includes(extname);
  const isAllowedMimeType = allowedMimeTypes.includes(file.mimetype);

  if (!isAllowedExtension) {
    return cb(new Error("Invalid file extension"));
  }

  if (!isAllowedMimeType) {
    return cb(new Error("Invalid MIME type"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

export default upload;
