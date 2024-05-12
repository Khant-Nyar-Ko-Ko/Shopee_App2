import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";

export const useFetchProducts = ({
  limit,
  sort,
}: {
  limit: number;
  sort: string;
}) =>
  useQuery({
    queryKey: ["products", limit, sort],
    queryFn: () => fetchProducts({ limit, sort }),
  });
