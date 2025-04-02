import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import '../LoginForm/LoginForm.css';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import axios from 'axios';

interface RegisterForm {
  onSwitchToLogin: (toggle: boolean) => void;
}

type FieldType = {
  email?: string;
  password?: string;
};

const RegisterForm = ({ onSwitchToLogin }: RegisterForm) => {
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', values);
      if (response.data.success) {
        toast.success('Registered successfully');
        setTimeout(() => {
          onSwitchToLogin(true);
        }, 1500);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.info('User with this email already exists. Try a different one.');
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
