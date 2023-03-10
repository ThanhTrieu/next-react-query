import { LayoutComponent } from "@/components/layout/Layout";
import React from "react";
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchSingleProduct } from "@/src/services/product";
import { delayRequest } from "@/src/helpers/common";


const Index = () => {
    return (
        <LayoutComponent>
            <h2> Hi </h2>
        </LayoutComponent>
    )
}

export async function getStaticProps(context) {
    const id = parseInt(context.params.detail[1]);
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(
        ['singleProduct', id],
        () => fetchSingleProduct(id)
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