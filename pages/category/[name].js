import { LayoutComponent } from "@/components/layout/Layout";
import React from "react";
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { ListProducts } from "@/components/products/ListProducts";
import { fetchProductsCategory } from "@/src/services/category";
import { delayRequest } from "@/src/helpers/common";


const Index = () => {
    return (
        <LayoutComponent>
            <ListProducts namePage="category" />
        </LayoutComponent>
    )
}

export async function getStaticProps(context) {
    const nameCategory = context.params.name;
    const limit = 10;
    const skip  = 1;
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(
        ['productsCategory', nameCategory, limit, skip],
        () => fetchProductsCategory(nameCategory, limit, skip)
    )
    await delayRequest(1000)
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking"
    };
};


export default React.memo(Index)