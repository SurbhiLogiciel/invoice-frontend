import React from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import Layout from '../layouts';
import SelectInput from '../../core-ui/input/selectInput';

export const RegisterCompanyProfile: React.FC = () => {
  return (
    <Layout>
      <div className="">
        <div className="font-bold mt-8 text-3xl text-white">
          Set Up Company Profile
        </div>
        <div className="text-gray text-lg">Let's Meet</div>
        <div className="mt-10 text-white w-full">
          <Input label="Company Name" size="large" />
        </div>
        <div className="mt-[36px] text-white w-full">
          <Input label="Location" type="text" size="large" />
        </div>
        <div className="mt-[36px] text-white w-full">
          <SelectInput
            label="city"
            options={['Ludhiana', 'Amritsar']}
            placeholder="Select"
          />
        </div>
        <div className="flex mt-[36px] text-white ">
          <div className="w-full h-[50px] pr-4">
            <SelectInput
              options={['opt-1', 'opt-2', 'opt-2']}
              size="medium"
              placeholder="Select"
            />
          </div>
          <div className="w-full ">
            <SelectInput
              options={['opt-1', 'opt-2', 'opt-2']}
              size="medium"
              placeholder="Select"
            />
          </div>
        </div>
        <div className="mt-[33px] w-full">
          <Button
            size="large"
            color="primary"
            fullWidth="true"
            children="Continue"
            type="submit"
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
