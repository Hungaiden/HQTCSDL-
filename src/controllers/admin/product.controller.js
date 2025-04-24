import * as productService from "../../services/product.service.js";
import Product from "../../models/Product.model.js";

export const index = async (req, res) => {
  try {
    const status = req.query.status || null;
    const keyword = req.query.keyword || null;
    const sortKey = req.query.sortKey || null;
    const sortValue = req.query.sortValue || null;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const result = await productService.getAllProducts({
      status,
      keyword,
      sortKey,
      sortValue,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.json({
      code: 200,
      message: "Success",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
}