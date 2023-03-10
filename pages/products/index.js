import { LayoutComponent } from "@/components/layout/Layout";
import React from "react";
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { ListProducts } from "@/components/products/ListProducts";
import { fetchProducts } from "@/src/services/product";
import { delayRequest } from "@/src/helpers/common"

const Index = () => {

    return (
        <LayoutComponent>
            <ListProducts namePage="products"/>
        </LayoutComponent>
    )
}

export async function getStaticProps() {
    const limit = 10;
    const skip  = 0;
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(
        ['products', limit, skip],
        () => fetchProducts(limit, skip)
    )
    await delayRequest(1000)
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default React.memo(Index);