import { Space, Spin } from 'antd';
import style from "./custom.module.css";
export default function SpinLoader() {
    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
        >
            <Spin tip="Loading" size="large">
                <div className={style.content}/>
            </Spin>
        </Space>
    )
}