const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProductsPage);

router.get("/products/:id", shopController.getProduct);

// ! currently commented out, will be re-added soon

// router.get("/cart", shopController.getCart);

// router.post("/cart", shopController.postCart);

// router.post("/cart/delete/:productId", shopController.postDeleteCart)

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
