import { useState, useEffect } from "react";
import { Avatar, List } from 'antd';
import Link from "next/link";
import { Pagination as  PaginationPostList } from "@/components/commons/Pagination";
import { useRouter } from "next/router";

const ListPosts = ({ postsData }) => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [page, setPage]   = useState( 1);
    const [limit, setLimit] = useState( 10);
    const [error, setError] = useState(null);
    const { pathname, query } = router;

    useEffect(()=> {
        if(postsData.error){
            setError(postsData.error.message)
        } else {
            setPosts(postsData.posts)
        }
    },[postsData])

    const changePage = p => {
        query.page = p;
        query.skip = limit;
        router.push({
            pathname,
            query
        });
        setPage(p);
    }
    const changeSize = (p,s) => {
        query.page = page;
        query.skip = s;
        router.push({
            pathname,
            query
        });
        setLimit(s);
    }

    if(error){
        return (
            <h3>{error}</h3>
        )
    }

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={posts}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                            title={<Link href="https://ant.design">{item.title}</Link>}
                            description={item.body}
                        />
                    </List.Item>
                )}
            />
            <br/>
            <PaginationPostList
                current={page}
                total={postsData.total}
                pageSize={limit}
                onChange={changePage}
                onShowSizeChange={changeSize}
            />
        </>
    )}
export default ListPosts;