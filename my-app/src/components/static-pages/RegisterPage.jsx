import { Button, Input, Space, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function onFinish(...args) {
    console.log([...args])
}

function RegisterPage() {
    return (
        <div className="centered_login">

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Registration
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegisterPage;