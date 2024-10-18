import React from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import image1 from '../assets/1.png';
import Layout from '../layouts';

export const UserProfile: React.FC = () => {
  return (
    <Layout>
      <div className=" ">
        <div className="font-bold mt-8 text-4xl text-white">
          Set Up Your Profile
        </div>
        <div className="text-gray text-lg">Let's Meet</div>
        <div className="mt-10 text-white w-full">
          <Input label="Full Name" size="large" placeholder="Alex Bream" />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Phone Number"
            type="tel"
            size="large"
            placeholder="+91 00000-00000"
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Create Password"
            type="password"
            size="large"
            placeholder="***********"
          />
        </div>
        <div className="mt-[38px] text-white w-full">
          <Input
            label="Confirm Password"
            type="password"
            size="large"
            placeholder="***********"
          />
        </div>

        <div className="mt-[38px] w-full">
          <Button
            size="large"
            color="primary"
            fullWidth="true"
            children="Continue"
          />
        </div>
        <div className="mt-2.5 w-full">
          <Button
            size="large"
            outline="primary"
            fullWidth="true"
            children="Back"
          />
        </div>
      </div>
    </Layout>
  );
};
