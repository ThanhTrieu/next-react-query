import { requestClient } from "@/src/axios/request";

export const fetchProducts = async (limit = 10, skip = 1) => {
    const start = (skip-1)*limit;
    const response =  await requestClient.get(`/products?limit=${limit}&skip=${start}`);
    return await response.data;
}

export const fetchSingleProduct = async (id) => {
    const response =  await requestClient.get(`/products/${id}`);
    return await response.data;
}