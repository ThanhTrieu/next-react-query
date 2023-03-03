import React, { useState } from "react";
import { Row, Col, Skeleton, Card, Alert } from 'antd';
import {  useProducts } from "@/src/hooks/useProducts/useProducts";
import { Pagination } from "@/components/products/Pagination ";

const { Meta } = Card;
export const ListProducts = React.memo(() => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10)
    const { data, isLoading, isError, isPreviousData } = useProducts(limit, (page - 1))
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

    if(isLoading){
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
                        <Card
                            bordered={false}
                            hoverable
                            style={{
                                width: 350,
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