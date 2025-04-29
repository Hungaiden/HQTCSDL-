import * as categoryService from "../../services/product-category.service.js";

export const index = async (req, res) => {
  try {
    const status = req.query.status || null;
    const keyword = req.query.keyword || null;
    const sortKey = req.query.sortKey || null;
    const sortValue = req.query.sortValue || null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await categoryService.getAllCategories({
      status,
      keyword,
      sortKey,
      sortValue,
      page,
      limit
    });

    res.json({
      code: 200,
      message: "Lấy danh sách danh mục thành công",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
}

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);

    return res.status(200).json({
      code: 200,
      message: "Lấy chi tiết danh mục thành công",
      data: category
    });
  } catch (error) {
    res.status(error.message.includes("không tìm thấy") ? 404 : 500).json({
      code: error.message.includes("không tìm thấy") ? 404 : 400,
      message: error.message
    });
  }
}
export const create = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json({
      code: 201,
      message: "Tạo danh mục thành công",
      data: category
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message
    });
  }
}

export const update = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const category = await categoryService.updateCategory(id, req.body);

    return res.status(200).json({
      code: 200,
      message: "Cập nhật danh mục thành công",
      data: category
    });
  } catch (error) {
    res.status(error.message.includes("không tìm thấy") ? 404 : 400).json({
      code: error.message.includes("không tìm thấy") ? 404 : 400,
      message: error.message
    });
  }
}

export const deleteOne = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const category = await categoryService.deleteCategory(id);

    return res.status(200).json({
      code: 200,
      message: "Xóa danh mục thành công",
      data: category
    });
  } catch (error) {
    res.status(error.message.includes("không tìm thấy") ? 404 : 500).json({
      code: error.message.includes("không tìm thấy") ? 404 : 500,
      message: error.message
    });
  }
}