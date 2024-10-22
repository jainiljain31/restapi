const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    const sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    const selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;

  const skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);

  // console.log(queryObject);

  const products_data = await apiData;
  res.status(200).json({ products_data });
};

const getAllProductsTesting = async (req, res) => {
  // const product_data = await Product.find(req.query).sort("price");
  const product_data = await Product.find(req.query).select("name company");
  console.log(req.query);
  res.status(200).json({ product_data });
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
};
