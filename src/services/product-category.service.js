import ProductCategory from "../models/product-category.model.js";

export const getAllCategories = async ({
  status,
  keyword,
  sortKey,
  sortValue,
  page = 1,
  limit = 4
}) => {
  try {
    const find = {
      deleted: false
    };

    // Filter by status
    if (status) {
      find.status = status;
    }

    // Search by keyword
    if (keyword) {
      find.title = new RegExp(keyword, "i");
    }

    // Sorting
    const sort = {};
    if (sortKey && sortValue) {
      sort[sortKey] = sortValue;
    } else {
      sort["position"] = "asc";
    }

    // Pagination
    const skip = (page - 1) * limit;
    
    // Get total categories for pagination
    const totalCategory = await ProductCategory.countDocuments(find);
    const totalPage = Math.ceil(totalCategory / limit);

    // Get categories
    const categories = await ProductCategory
      .find(find)
      .limit(limit)
      .skip(skip)
      .sort(sort);

    return {
      categories: categories,
      pagination: {
        totalItems: totalCategory,
        totalPages: totalPage,
        currentPage: page,
        limit
      }
    };

  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách danh mục: " + error.message);
  }
}

export const getAllCategoriesNoLimit = async () => {
  try {
    const categories = await ProductCategory.find({
      deleted: false,
      status: "active"
    }).sort({ position: "asc" });

    return categories;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách danh mục: " + error.message);
  }
}

export const getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Danh mục không tìm thấy");
    }
    return category;
  } catch (error) {
    throw new Error(error.message);
  }
}
export const createCategory = async (data) => {
  try {
    // Check if title exists
    const existingCategory = await ProductCategory.findOne({
      title: data.title,
      deleted: false
    });

    if (existingCategory) {
      throw new Error("Danh mục với tên này đã tồn tại!");
    }

    const category = new ProductCategory(data);
    await category.save();
    return category;
  } catch (error) {
    throw new Error("Lỗi khi tạo danh mục: " + error.message);
  }
}

export const updateCategory = async (id, data) => {
  try {
    // Check if category exists
    const existingCategory = await ProductCategory.findOne({
      _id: id,
      deleted: false
    });

    if (!existingCategory) {
      throw new Error("Không tìm thấy danh mục!");
    }

    // Check if new title already exists
    if (data.title && data.title !== existingCategory.title) {
      const titleExists = await ProductCategory.findOne({
        title: data.title,
        deleted: false,
        _id: {
          $ne: id
        }
      });

      if (titleExists) {
        throw new Error("Danh mục với tên này đã tồn tại!");
      }
    }

    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      data, {
        new: true
      }
    );

    return updatedCategory;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật danh mục: " + error.message);
  }
}

export const deleteCategory = async (id) => {
  try {
    const deletedCategory = await ProductCategory.findOneAndUpdate({
      _id: id,
      deleted: false
    }, {
      deleted: true
    }, {
      new: true
    });

    if (!deletedCategory) {
      throw new Error("Không tìm thấy danh mục!");
    }

    return deletedCategory;
  } catch (error) {
    throw new Error("Lỗi khi xóa danh mục: " + error.message);
  }
}