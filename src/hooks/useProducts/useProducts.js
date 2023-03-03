import { requestClient } from "@/src/axios/request";
import { useQuery } from '@tanstack/react-query'

const fetchProducts = async (limit = 10, skip = 1) => {
    const response =  await requestClient.get(`/products?limit=${limit}&skip=${skip}`);
    return await response.data;
}

const useProducts = (limit, skip) => {
    return useQuery(
        ['products', limit, skip],
        () => fetchProducts(limit, skip),
        { keepPreviousData: true, staleTime: 5000 }
    )
}

const fetchProductsCategory   = async (limit = 10, skip = 1) => {
    const response =  await requestClient.get(`/products/categories?limit=${limit}&skip=${skip}`);
    return await response.data;
}

const useProductsCategory = (limit, skip) => {
    return useQuery(
        ['productsCategory', limit, skip],
        () => fetchProductsCategory(limit, skip),
        { keepPreviousData: true, staleTime: 5000 }
    )
}

export {
    useProducts,
    fetchProducts,
    useProductsCategory,
    fetchProductsCategory
}