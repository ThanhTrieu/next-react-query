import { Layout } from 'antd';
import {memo} from 'react';

const { Content } = Layout;

export const ContentComponent = memo(({children}) => {
    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: '100vh',
                background: '#ffffff',
            }}
        >
            {children}
        </Content>
    )
})