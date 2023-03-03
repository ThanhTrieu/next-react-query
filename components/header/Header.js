import {memo} from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import style from './header.module.css';

const { Header } = Layout;
const items = [
    {label: 'Products', key: '/'},
    {label: 'Carts', key: '/cart'}
];

export const HeaderComponent = memo(() => {
    return (
        <Header className="header">
            <div className={style.logo} />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} items={items} />
        </Header>
    )
})