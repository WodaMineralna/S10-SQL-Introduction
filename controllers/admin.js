const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  await product.save();
  res.redirect("/");
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  if (product.id === "undefined") {
    return res.redirect("/"); // not the best UX, but it's a dummy project
  }

  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);

  console.log("controllers/admin.js | Edited productId: ", prodId);
  await product.save(prodId);
  res.redirect("/");
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  await Product.deleteProduct(prodId);

  res.redirect("/admin/products");
};

exports.getProductsPage = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("admin/products", {
    products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
