import express from "express";
import * as controller from "../../controllers/admin/product.controller.js";

const router = express.Router();

router.get("/", controller.index);

// router.post("/create", controller.create);

// router.patch("/edit/:id", controller.edit);

// router.delete("/delete/:id", controller.delete);

export default router;