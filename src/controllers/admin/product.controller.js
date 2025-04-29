import * as productService from "../../services/product.service.js";
import Product from "../../models/product.model.js";

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
      message: "Lấy danh sách sản phẩm thành công",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Lỗi khi lấy danh sách sản phẩm!"
    });
  }
}

export const create = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json({
      code: 201,
      message: "Tạo sản phẩm thành công",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Lỗi khi tạo sản phẩm!"
    });
  }
}

export const update = async (req, res) => {
  try {
    const {
      id
    } = req.params
    const product = await productService.updateProduct(id, req.body);
    return res.status(200).json({
      code: 200,
      message: "Cập nhật sản phẩm thành công",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Lỗi khi cập nhật sản phẩm!"
    });
  }
}

export const deleteOne = async (req, res) => {
  try {
    const {
      id
    } = req.params
    const product = await productService.deleteProduct(id);
    return res.status(200).json({
      code: 200,
      message: "Xóa sản phẩm thành công",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Lỗi khi xóa sản phẩm!"
    });
  }
}

export const getOne = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const product = await productService.getProductById(id);

    return res.status(200).json({
      code: 200,
      message: "Lấy chi tiết sản phẩm thành công",
      data: product
    });
  } catch (error) {
    res.status(error.message.includes("không tìm thấy") ? 404 : 500).json({
      code: error.message.includes("không tìm thấy") ? 404 : 400,
      message: error.message
    });
  }
}