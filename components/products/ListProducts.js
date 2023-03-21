import React, { useState } from "react";
import { Row, Col, Skeleton, Card, Alert } from 'antd';
import { useProducts } from "@/src/hooks/useProducts/useProducts";
import { useProductsCategory } from "@/src/hooks/useCategories/useCategories"
import { Pagination } from "@/components/commons/Pagination";
import { useRouter } from "next/router";
import Link from 'next/link';
import slugify from 'react-slugify';

const { Meta } = Card;
export const ListProducts = React.memo(({ namePage }) => {
    const router = useRouter();
    const nameCategory = namePage === 'category' ? router.query.name : null;

    const [page, setPage]   = useState(1);
    const [limit, setLimit] = useState(10)
    const { data, isLoading, isError, isPreviousData, isFetching } = (namePage === 'products') ? useProducts(limit, page) : useProductsCategory(nameCategory, limit, page);

    const changePage = p => {
        if(!isPreviousData){
            setPage(p)
        }
    }
    const changePageSize = (page, size) => {
        if(!isPreviousData){
            setPage(page)
            setLimit(size)
        }
    }

    if(isLoading || isFetching){
        return <Skeleton active />
    }

    if(isError){
        return (
            <Alert
                message="Error"
                description="An error occurred !"
                type="error"
                showIcon
            />
        )
    }

    return (
        <>
            <Row>
                {data.products.map((item, index) => (
                    <Col key={index} span={6}>
                        <Link href={`/products/${slugify(item.title)}/${item.id}`}>
                            <Card
                                bordered={false}
                                hoverable
                                style={{
                                    width: 240,
                                    marginBottom: 30,
                                    marginLeft: 5,
                                    marginRight: 5
                                }}
                                cover={<img alt={item.title} src={item.thumbnail} />}
                            >
                                <Meta title={item.title} />
                                <div>
                                    <p style={{marginBottom: '0px'}}>Price: {item.price}</p>
                                    <p style={{marginBottom: '0px'}}>Rating: {item.rating}</p>
                                    <p style={{marginBottom: '0px'}}>Brand: {item.brand} - {item.category}</p>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
                <Col span={24}>
                    <Pagination
                        current={page}
                        total={data.total}
                        pageSize={data.limit}
                        onChange={changePage}
                        onShowSizeChange={changePageSize}
                    />
                </Col>
            </Row>
        </>
    )
})