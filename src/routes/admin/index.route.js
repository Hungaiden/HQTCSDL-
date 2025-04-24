import productRoute from "./product.route.js";

export const index = (app) => {
  const PATH_ADMIN = `/admin`;
  app.use(`${PATH_ADMIN}/products`, productRoute);
}