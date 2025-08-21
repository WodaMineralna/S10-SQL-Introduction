const path = require("path");

const appPath = require("../utils/path");
const {
  loadData,
  deleteItem,
  saveData,
  findExistingProductIndex,
} = require("../utils/file-storage");

// products.json path directory
const p = path.join(appPath, "data", "products.json");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.id = Math.floor(Math.random() * 100000).toString(); // dummy pseudo-random ID
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save(id) {
    const products = await loadData(p); // getting the current products

    // * if 'id' was provided when calling the save() method, it means the Products were meant to be updated
    if (id !== undefined) {
      const existingProductIndex = findExistingProductIndex(products, id);

      Object.assign(products[existingProductIndex], {
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description,
        price: this.price,
      });
    } else {
      products.push(this); // pushing the newly created product into the local Array, if no 'id' was provided
    }

    // ^ writing all of the products into the products.json file
    await saveData(p, products);
  }

  static async deleteProduct(id) {
    await deleteItem(p, id);
  }

  // * 'static', so we can call this method directly on the Class itself - not on the single instance of the 'Product'
  static async fetchAll() {
    const products = await loadData(p);
    return products;
  }

  static async findById(id) {
    const products = await loadData(p);

    const filteredProduct = products.find((product) => product.id === id);

    // ^ error handler - if the item ID got corrupted / deleted / etc
    if (!filteredProduct) {
      return {
        id,
        title: "Item not found!",
        description: "Item not found!",
        price: 0,
        wasDeleted: true,
      };
    }
    // console.log(filteredProduct); // DEBUGGING
    return filteredProduct;
  }
};
