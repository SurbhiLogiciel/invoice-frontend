import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import IIcon from '../svg/i-icon';
import Layout from '../layouts';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [validateOnSubmit, setValidateOnSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setValidateOnSubmit(true);
  };

  return (
    <Layout>
      <div className="flex font-bold mt-8 text-3xl text-white">Welcome</div>
      <div className="flex text-gray text-custom text-lg">
        We are glad to see you
      </div>

      <form onSubmit={handleSubmit} className="mt-10 text-white">
        <div className="mb-5">
          <Input
            label="Email"
            size="large"
            required
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            validateOnSubmit={validateOnSubmit}
          />
        </div>

        <div className="mb-5">
          <Input
            label="Password"
            size="large"
            required
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            validateOnSubmit={validateOnSubmit}
            hasIcon
          />
        </div>

        <div className="flex items-center mb-5">
          <input
            type="checkbox"
            className="h-5 w-5 bg-secondary text-white border-gray-500 focus:ring-0"
          />
          <span className="ml-2 text-white">Remember me</span>
        </div>

        <div className="mb-5">
          <Button type="submit" size="large" color="primary" fullWidth="true">
            Sign In
          </Button>
        </div>
      </form>

      <div className="font-roboto text-center mt-5 text-white font-bold">
        Forgot password?
      </div>

      <hr className="mt-10 mb-8 text-white/10" />

      <div className="text-gray text-[18px]">Don't have an account?</div>
      <div className="mt-[30px]">
        <Link to="/registerEmail">
          <Button size="large" outline="primary" fullWidth="true">
            Registration
          </Button>
        </Link>
      </div>

      <hr className="mt-[30px] text-white/10" />

      <div className="mt-[30px] text-white text-[18px]">
        Do you need help? Contact technical support
      </div>
      <div className="flex text-white mt-[27px]">
        <IIcon />
        &nbsp; support@invoice.com
      </div>
    </Layout>
  );
};
