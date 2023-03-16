import { useQuery } from '@tanstack/react-query';
import {fetchCategories, fetchProductsCategory} from "@/src/services/category";

const useCategories = () => {
    return useQuery(['categories'], () => fetchCategories())
}
const useProductsCategory = (nameCategory, limit = 10, skip = 1) => {
    return useQuery(
        ['productsCategory', nameCategory, limit, skip],
        () => fetchProductsCategory(nameCategory, limit, skip),
        { keepPreviousData: true, staleTime: Infinity, enabled: nameCategory.length > 0 }
    )
}

export { useCategories, useProductsCategory }