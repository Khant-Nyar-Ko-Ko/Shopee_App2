import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";

export const useFetchProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: fetchProducts });
