import express from "express";
import * as controller from "../../controllers/admin/product-category.controller.js";
import multer from "multer";
import upload from '../../config/multer.js'
import { uploadSingle, uploadMultiple } from "../../middlewares/upload.middleware.js";
const router = express.Router();

router.get("/", controller.index);

router.post(
  "/create", 
  upload.single("thumbnail"),
  uploadSingle,
  controller.create);

router.patch(
  "/update/:id", 
  upload.single("thumbnail"),
  uploadSingle,
  controller.update);

router.delete("/delete/:id", controller.deleteOne);

router.get("/:id", controller.getOne);
export default router;