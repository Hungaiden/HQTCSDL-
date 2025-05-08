import express from "express";
import * as controller from "../../controllers/admin/product-category.controller.js";
import multer from "multer";
import upload from '../../config/multer.js'
import { uploadSingle, uploadMultiple } from "../../middlewares/upload.middleware.js";
const router = express.Router();

// Move this route before /:id to avoid path conflict
router.get("/all", controller.getAllNoLimit);
router.get("/:id", controller.getOne);
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

router.get("/featured", controller.getFeatured);

router.patch(
  "/:id/feature",
  controller.setFeatured
)


export default router;