import { LayoutComponent } from "@/components/layout/Layout";
import React from "react";
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { ListProducts } from "@/components/products/ListProducts";
import { fetchProducts } from "@/src/hooks/useProducts/useProducts";

const Index = () => {

    return (
        <LayoutComponent>
            <ListProducts/>
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

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default React.memo(Index);