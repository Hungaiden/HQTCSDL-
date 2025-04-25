import productRoute from "./product.route.js";
import accountRoute from "./account.route.js";

export const index = (app) => {
  const PATH_ADMIN = `/admin`;
  app.use(`${PATH_ADMIN}/products`, productRoute);
  
  app.use(`${PATH_ADMIN}/accounts`, accountRoute);
}