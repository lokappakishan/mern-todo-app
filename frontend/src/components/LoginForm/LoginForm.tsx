import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="space-y-6"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              size="large"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md"
              size="large"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
