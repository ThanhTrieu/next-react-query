import { requestClient } from "@/src/axios/request";
import { useQuery } from '@tanstack/react-query'

const fetchCategories = async () => {
    const response =  await requestClient.get('/products/categories');
    return await response.data;
}

const useCategories = () => {
    return useQuery(['categories'], () => fetchCategories())
}

export { useCategories, fetchCategories }