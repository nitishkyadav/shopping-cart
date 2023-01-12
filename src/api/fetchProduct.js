async function fetchProduct(id, setData, setIsFetched) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    let data = await response.json();

    if (!response.ok) {
      throw new Error("Failed");
    }
    setIsFetched({ isLoading: false, isOk: true });

    data = { ...data, price: (data.price * 80).toFixed(2) };
    setData(data);
    return { data, status: response.ok };
  } catch (err) {
    setIsFetched({ isLoading: false, isOk: false });
    console.log(err.message);
  }
}

export default fetchProduct;
