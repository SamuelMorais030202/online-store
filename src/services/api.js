export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url)
    .then((resp) => resp.json());
  response.sort((a, b) => a.name > b.name);
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url)
    .then((resp) => resp.json());
  return response;
}

export async function getProductById(productId) {
  const URL = ` https://api.mercadolibre.com/items/${productId}`;
  const API = await fetch(URL);
  const dataProduct = API.json();
  return dataProduct;
}

export async function getProductByCategory(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(url)
    .then((resp) => resp.json());
  return response;
}
