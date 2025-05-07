import Product from "../models/product.model.js";
import moment from "moment";

export const getAllProducts = async ({
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
    
    // Get total products for pagination
    const totalProduct = await Product.countDocuments(find);
    const totalPage = Math.ceil(totalProduct / limit);

    // Get products
    const products = await Product
      .find(find)
      .limit(limit)
      .skip(skip)
      .sort(sort);

    // Tra ve gia da dc format
    const productsWithInfo = await Promise.all(products.map(async (item) => {
      const product = item.toObject()
      // Format prices
      product.newPrice = ((1 - (product.discountPercentage || 0) / 100) * product.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      product.priceFormatted = product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return product;
    }));

    return {
      products: productsWithInfo,
      pagination: {
        totalItems: totalProduct,
        totalPages: totalPage,
        currentPage: page,
        limit
      }
    };

  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách sản phẩm " + error.message);
  }
}

export const createProduct = async (data) => {
  try {
    const product = new Product(data);
    await product.save();
    return product;
  } catch (error) {
    throw new Error("Lỗi khi thêm sản phẩm " + error.message);
  }
}

export const updateProduct = async (id, data) => {
  try {
    const product = await Product.findOneAndUpdate({
        _id: id,
        deleted: false
      },
      data, // Sửa từ { data } thành data
      {
        new: true
      }
    );

    if (!product) {
      throw new Error("Không tìm thấy sản phẩm!");
    }

    return product;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật sản phẩm: " + error.message);
  }
}

export const deleteProduct = async (id) => {
  try {
    const product = await Product.findOneAndUpdate({
      _id: id,
      deleted: false
    }, {
      deleted: true,
    }, {
      new: true
    });
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm!");
    }
    return product;
  } catch (error) {
    throw new Error("Lỗi khi xóa sản phẩm " + error.message);
  }
}

export const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Sản phẩm không tìm thấy");
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}