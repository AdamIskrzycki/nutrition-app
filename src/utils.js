export const groupBy = (listOrObject, key) => {
  const groupedArray = [];
  
  if (Array.isArray(listOrObject)) {
    listOrObject.forEach((item) => {
      const collection = groupedArray.find((elem) => elem[key] === item[key]);

      if (collection === undefined) {
        item.count = 1;
        groupedArray.push(item);
      } else {
        collection.count++;
      }
    });
  } else if (typeof listOrObject === 'object') { // Check if the input is an object
    for (const itemKey in listOrObject) {
      const item = listOrObject[itemKey];
      const collection = groupedArray.find((elem) => elem[key] === item[key]);

      if (collection === undefined) {
        item.count = 1;
        groupedArray.push(item);
      } else {
        collection.count++;
      }
    }
  } else {
    console.error("Expected an array or object, received:", listOrObject);
  }
  
    return groupedArray;
  };
  