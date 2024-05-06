import { URL } from "../service/ApiEndpoints";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export const fetchProducts = async () : Promise<Product[]> => {
    const response: Response = await fetch(`${URL}/products`);
    const result = await response.json();
    if(!response.ok){
        throw new(Error);
    }
    return result;
}