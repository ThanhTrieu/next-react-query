import {memo} from 'react';
import { Layout, Menu } from 'antd';
import style from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"

const { Header } = Layout;

export const HeaderComponent = memo(() => {
    const {data: session, status} = useSession()

    const { asPath } = useRouter();
    let items = [
        {label: <Link href="/products">Products</Link>, key: '/products'},
        {label: <Link href="/cart">Carts (3)</Link>, key: '/cart'},
        {label: <Link href="/posts">Posts</Link>, key: '/posts'},
    ];
    if(status === "authenticated"){
        items = [
            ...items,
            {label:(
            <>
                {session.user.email} :  <a href="/api/auth/signout">Sign out</a>
            </>)},
        ];
        
    } else {
        items = [
            ...items,
            {label: <a href="/api/auth/signin">Sign in</a>},
        ];
    }

    return (
        <Header className="header">
            <div className={style.logo} />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={asPath} items={items} />
        </Header>
    )
})