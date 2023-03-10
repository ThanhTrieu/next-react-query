import React, {memo} from 'react';
import {  AppstoreFilled } from '@ant-design/icons';
import { Layout, Menu, Skeleton } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCategories } from "@/src/hooks/useCategories/useCategories";

const { Sider } = Layout;
export const SiderComponent = memo(() => {
    const { data, isLoading } = useCategories();
    const { asPath } = useRouter();

    let items = [];
    if(isLoading){
        return (
            <Sider
                width={350}
                style={{
                    background: '#ffffff',
                }}
            >
                <Skeleton active />
            </Sider>
        )
    }

    if (data) {
        items = data.map((item) => ({
            key: `/category/${item}`,
            label: <Link href={`/category/${item}`}>{item}</Link>,
            icon: <AppstoreFilled/>
        }))
    }

    return (
        <Sider
            width={350}
            style={{
                background: '#ffffff',
            }}
        >
            <div style={{ width: '100%', height: '50px' }}>
                <h3 style={{ paddingLeft: '25px', paddingTop: '20px'}}> Categories </h3>
            </div>

            <Menu
                mode="inline"
                defaultSelectedKeys={asPath}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={items}
            />
        </Sider>
    )
})