async function fetchProductsData(setData, setLoadingState) {
  try {
    const productsData = [];
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setLoadingState(false);
    if (!response.ok) {
      console.log(data);
      throw new Error("Failed");
    }
    for (let i = 0; i < 10; i++) {
      const tempData = {
        id: data[i].id,
        description:
          data[i].description.slice(0, 1).toUpperCase() +
          data[i].description.slice(1),
        title: data[i].title,
        price: `₹ ${data[i].price * 80}`,
        image: data[i].image,
        rating: data[i].rating.rate,
        category:
          data[i].category.slice(0, 1).toUpperCase() +
          data[i].category.slice(1),
      };
      productsData.push(tempData);
    }
    setData(productsData);
    return { productsData, status: response.ok };
  } catch (err) {
    console.log(err.message);
  }
}

export default fetchProductsData;
