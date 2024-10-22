import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import Layout from '../layouts';
import SelectInput from '../../core-ui/input/selectInput';

export const RegisterCompanyProfile: React.FC = () => {
  const [validateOnSubmit, setValidateOnSubmit] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    city: '',
    option1: '',
    option2: '',
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

    // Add any submission logic here if needed, e.g., form validation before sending data.
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="font-bold mt-8 text-3xl text-white">
            Set Up Company Profile
          </div>
          <div className="text-gray text-lg">Let's Meet</div>

          <div className="mt-10 text-white w-full">
            <Input
              label="Company Name"
              size="large"
              required
              value={formData.companyName}
              onChange={handleInputChange}
              validateOnSubmit={validateOnSubmit}
            />
          </div>

          <div className="mt-[36px] text-white w-full">
            <Input
              label="Location"
              type="text"
              size="large"
              required
              value={formData.location}
              onChange={handleInputChange}
              validateOnSubmit={validateOnSubmit}
            />
          </div>

          <div className="mt-[36px] text-white w-full">
            <SelectInput
              label="City"
              options={['Ludhiana', 'Amritsar']}
              placeholder="Select"
              required
              value={formData.city}
              onChange={handleInputChange}
              validateOnSubmit={validateOnSubmit}
            />
          </div>

          <div className="flex mt-[36px] text-white">
            <div className="w-full h-[50px] pr-4">
              <SelectInput
                label="State"
                options={['opt-1', 'opt-2', 'opt-3']}
                size="medium"
                placeholder="Select"
                required
                value={formData.option1}
                onChange={handleInputChange}
                validateOnSubmit={validateOnSubmit}
              />
            </div>

            <div className="w-full">
              <SelectInput
                label="Zip"
                options={['opt-1', 'opt-2', 'opt-3']}
                size="medium"
                placeholder="Select"
                required
                value={formData.option2}
                onChange={handleInputChange}
                validateOnSubmit={validateOnSubmit}
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
      </form>
    </Layout>
  );
};
