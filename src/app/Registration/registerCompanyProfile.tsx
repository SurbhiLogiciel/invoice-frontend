import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import SelectInput from '../../core-ui/input/selectInput';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const RegisterCompanyProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [validateOnSubmit, setValidateOnSubmit] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    city: '',
    state: '',
    zip: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!userId) {
    setErrorMessage('User ID is missing. Unable to register company.');
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidateOnSubmit(true);

    try {
      const response = await axios.post(
        `http://127.0.0.1:3001/api/register/company/${userId}`,
        formData
      );

      if (response.status === 201) {
        setSuccessMessage('Company registered successfully!');
        setErrorMessage(null);
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error: any) {
      console.error('Error: here is your error', error);
      setErrorMessage(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
                value={formData.state}
                onChange={handleInputChange}
                validateOnSubmit={validateOnSubmit}
              />
            </div>

            <div className="w-full">
              <SelectInput
                label="Zip"
                size="medium"
                options={['opt-1', 'opt-2', 'opt-3']}
                placeholder="Select"
                required
                value={formData.zip}
                onChange={handleInputChange}
                validateOnSubmit={validateOnSubmit}
              />
            </div>
          </div>

          <div className="mt-[33px] w-full">
            <Button size="large" color="primary" fullWidth="true" type="submit">
              Continue
            </Button>
          </div>

          <div className="mt-2.5 w-full">
            <Button size="large" outline="primary" fullWidth="true">
              Back
            </Button>
          </div>

          {/* Display success or error message */}
          {successMessage && (
            <div className="text-green-500 mt-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-500 mt-4">{errorMessage}</div>
          )}
        </div>
      </form>
    </div>
  );
};
