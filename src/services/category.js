import { requestClient } from "@/src/axios/request";

export const fetchCategories = async () => {
    const response =  await requestClient.get('/products/categories');
    return await response.data;
}

export const fetchProductsCategory   = async (nameCategory, limit = 10, skip = 1) => {
    const start = (skip-1)*limit;
    const response =  await requestClient.get(`/products/category/${nameCategory}?limit=${limit}&skip=${start}`);
    return await response.data;
}