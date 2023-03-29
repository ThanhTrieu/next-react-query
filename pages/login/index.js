import { useState } from 'react'
import { signIn, getCsrfToken  } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { Button, Form, Input, Row, Col } from 'antd';
import { useRouter } from 'next/router'

export default function LoginPage({ csrfToken }) {
    const router = useRouter()
    const [error, setError] = useState(null)

    const onFinish = async (values) => {
        const res = await signIn('credentials', {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
        });
        if (res?.error) {
            setError(res.error)
        } else {
            setError(null)
        }
        if (res.url) {
            router.push(res.url)
        }
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
                    { error && (<p style={{ textAlign: 'center', color: 'red' }}>{'account invalid'}</p>) }
                    <Form.Item
                        name="csrfToken"
                        style={{ display: 'none' }}
                    >
                        <Input type="hidden" defaultValue={csrfToken} />
                    </Form.Item>

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
// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res)
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}