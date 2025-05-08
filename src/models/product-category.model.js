import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  parent_id: String,
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  isFeatured: { type: Boolean, default: false },
  deleted: {
    type: Boolean,
    default: false
  }
});
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, 'products-category');
export default ProductCategory;