const path = require("path");

const appPath = require("../utils/path");
const {
  loadData,
  deleteItem,
  saveData,
  findExistingProductIndex,
} = require("../utils/file-storage");

// products.json path directory
const p = path.join(appPath, "data", "cart.json");

// TODO add try-catch blocks here and in Product model

module.exports = class Cart {
  static async addProduct(id) {
    const cart = await loadData(p); // get the current cart data
    const existingProductIndex = findExistingProductIndex(cart, id); // check if the cartItem already exists

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity++; // increase quantity if the cartItem already exists
    } else {
      cart.push({ id, quantity: 1 }); // add a new cartItem if it doesn't already exist
    }

    // ^ write all of the cart data into the file
    await saveData(p, cart);
  }

  static async deleteCartItem(id) {
    await deleteItem(p, id);
  }

  static async fetchAll() {
    const cart = await loadData(p);
    return cart;
  }
};
