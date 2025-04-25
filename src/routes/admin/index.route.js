import productRoute from "./product.route.js";
import accountRoute from "./account.route.js";
import categoryRoute from "./product-category.route.js";

export const index = (app) => {
  const PATH_ADMIN = `/admin`;
  app.use(`${PATH_ADMIN}/products`, productRoute);
  app.use(`${PATH_ADMIN}/accounts`, accountRoute);
  app.use(`${PATH_ADMIN}/categories`, categoryRoute);
}