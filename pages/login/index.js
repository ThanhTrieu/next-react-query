import { Button, Form, Input, Row, Col } from 'antd';

const LoginMovies = () => {    

    const onFinish = (values) => {
        console.log('Failed:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row>
            <Col span={6} offset={9}>
                <Form
                    name="basic"
                    style={{
                      marginTop: 20,
                      border: '1px solid #ccc',
                      padding: 20,
                      backgroundColor: '#ffffff'
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={false}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
};
export default LoginMovies;