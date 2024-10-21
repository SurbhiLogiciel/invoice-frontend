import React from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import Layout from '../layouts';
import { Link } from 'react-router-dom';
import { Verify } from 'crypto';

export const RegisterEmail: React.FC = () => {
  return (
    <Layout>
      <div className="flex font-bold mt-10 text-[36px] text-white text-center">
        Register as Company
      </div>
      <div className="flex text-gray text-custom text-[18px] text-center">
        Let's Meet
      </div>
      <div className="mt-10 text-white">
        <Input label="E-mail" size="large" />
      </div>
      <div className="mt-[35px]">
        <Link to="/verifyOtp">
          <Button size="large" color="primary" fullWidth="true">
            Verify Email
          </Button>
        </Link>
      </div>
      <div className="mt-[35px]">
        <Button size="large" color="primary" outline="primary" fullWidth="true">
          Sign In
        </Button>
      </div>
    </Layout>
  );
};
