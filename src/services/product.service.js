import Product from "../models/Product.model.js";
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
    throw new Error("Error getting products: " + error.message);
  }
}