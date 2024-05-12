import { URL } from "../service/ApiEndpoints";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const fetchProducts = async ({
  limit,
  sort,
}: {
  limit: number;
  sort: string;
}): Promise<Product[]> => {
  const filteredLimit = limit ? `limit=${limit}` : "";
  const filteredSort = sort ? `sort=${sort}` : "";
  const response: Response = await fetch(
    `${URL}/products?${filteredLimit && filteredLimit}${
      filteredSort && `&${filteredSort}`
    }`
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};
