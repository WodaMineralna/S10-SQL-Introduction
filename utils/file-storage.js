const fs = require("fs").promises;

// ^ get current data, based on filePath passed as an argument
async function loadData(filePath) {
  try {
    const data = await fs.readFile(filePath);
    // console.log("console.log() in 'utils/file-storage.js':", JSON.parse(data)); // DEBUGGING
    return JSON.parse(data);
  } catch (error) {
    // * if file does not exist
    if (error.code === "ENOENT") {
      await saveData(filePath, []);
      return JSON.parse([]);
    } else {
      throw error;
    }
  }
}

async function deleteItem(filePath, id) {
  const items = await loadData(filePath); // get current items from specified file path
  const filteredItems = items.filter((item) => item.id !== id);

  // ^ write all of the data into specified file path
  await saveData(filePath, filteredItems);
}

async function saveData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data), (err) => {
    console.log(err);
  });
}

function findExistingProductIndex(arr, searchTerm) {
  return arr.findIndex((item) => item.id === searchTerm);
}

module.exports = { loadData, deleteItem, saveData, findExistingProductIndex };
