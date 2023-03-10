import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchSingleProduct } from "@/src/services/product";


const useProducts = (limit = 10, skip = 1) => {
    return useQuery(
        ['products', limit, skip],
        () => fetchProducts(limit, skip),
        { keepPreviousData: true, staleTime: Infinity }
    )
}

const useSingleProduct = (id) => {
    return useQuery(
        ['singleProduct', id],
        () => fetchSingleProduct(id),
        { staleTime: Infinity, enabled: id.length > 0 }
    )
}

export {
    useProducts,
    useSingleProduct
}