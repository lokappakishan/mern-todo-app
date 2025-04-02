import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import './LoginForm.css';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import axios from 'axios';

interface LoginFormProps {
  fetchAuthStatus: () => void;
}

type FieldType = {
  email?: string;
  password?: string;
};

const LoginForm = ({ fetchAuthStatus }: LoginFormProps) => {
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', values);
      if (response.data.success) {
        toast.success('Logged in successfully');
        fetchAuthStatus();
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.data?.message === 'User is not registered'
      ) {
        toast.info('User not registered. Please sign up.');
      } else {
        toast.error('Invalid credentials or server error');
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-form-wrapper">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
