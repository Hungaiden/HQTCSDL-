import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  category_id: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  isFeatured: { type: Boolean, default: false },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedBy: String,
  deletedAt: Date,
});

const Product = mongoose.model('Product', productSchema, 'products');

export default Product;