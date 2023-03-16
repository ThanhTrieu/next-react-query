import Head from 'next/head';
import { LayoutComponent } from "@/components/layout/Layout";
import { fetchPotsByPage } from "@/src/services/posts";
import ListPosts from "@/components/posts/ListPosts";

const Index = ({ postsData }) => {
    return (
        <>
            <Head>
                <title> list posts of user</title>
            </Head>
            <LayoutComponent>
                <ListPosts postsData={postsData}/>
            </LayoutComponent>
        </>

    )
}

export async function getServerSideProps({ query }) {
    // Fetch the first page as default
    const page = query.page || 1;
    const skip = query.skip || 10;

    let postsData = null;
    // Fetch data from external API
    try {
        postsData = await fetchPotsByPage(page, skip)
    } catch (err) {
        postsData = { error: { message: err.message } }
    }
    // Pass data to the page via props
    return { props: { postsData } }
}

export default Index;