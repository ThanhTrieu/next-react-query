import {memo} from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import style from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Header } = Layout;
const items = [
    {label: <Link href="/products">Products</Link>, key: '/products'},
    {label: <Link href="/cart">Carts (3)</Link>, key: '/cart'}
];

export const HeaderComponent = memo(() => {
    const { asPath } = useRouter();

    return (
        <Header className="header">
            <div className={style.logo} />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={asPath} items={items} />
        </Header>
    )
})