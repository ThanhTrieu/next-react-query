import {memo} from "react";
import { Layout } from 'antd';
import { HeaderComponent} from "@/components/header/Header";
import { BreadcrumbComponent } from "@/components/breadcrumb/Breadcrumb";
import  { SiderComponent } from "@/components/menu/Menu";
import { ContentComponent } from "@/components/content/Content";

export const LayoutComponent = memo(({ children }) => {
    return (
        <Layout>
            <HeaderComponent/>
            <Layout>
                <SiderComponent/>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <BreadcrumbComponent/>
                    <ContentComponent>
                        {children}
                    </ContentComponent>
                </Layout>
            </Layout>
        </Layout>
    )
})