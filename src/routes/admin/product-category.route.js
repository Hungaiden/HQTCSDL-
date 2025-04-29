import express from "express";
import * as controller from "../../controllers/admin/product-category.controller.js";

const router = express.Router();

router.get("/", controller.index);
router.post("/create", controller.create);
router.patch("/update/:id", controller.update);
router.delete("/delete/:id", controller.deleteOne);
router.get("/:id", controller.getOne);
export default router;