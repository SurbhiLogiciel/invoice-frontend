import React, { useState } from 'react';
import { Button } from '../../core-ui/button';
import { Input } from '../../core-ui/input/input';
import SelectInput from '../../core-ui/input/selectInput';
import { useNavigate, useParams } from 'react-router-dom';
import { registerCompanyProfile } from '../../services/apiService';
import { useCompany } from '../context/CompanyContext';

export const RegisterCompanyProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { setCompanyId } = useCompany();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegisterCompanyProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!userId) {
      setErrorMessage('User ID is required.');
      return;
    }

    try {
      const response = await registerCompanyProfile(
        userId,
        companyName,
        location,
        city,
        state,
        zip
      );

      if (response.status === 201) {
        setSuccessMessage('Company registered successfully!');
        setErrorMessage(null);
        setCompanyId(response.data.company._id);
        console.log('Company ID:', response.data.company._id);
        navigate(`/registerUserProfile/${userId}`);
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleRegisterCompanyProfile}>
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
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="mt-[36px] text-white w-full">
            <Input
              label="Location"
              type="text"
              size="large"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mt-[36px] text-white w-full">
            <SelectInput
              label="City"
              options={['Ludhiana', 'Amritsar']}
              placeholder="Select"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="flex mt-[36px] text-white">
            <div className="w-full h-[50px] pr-4">
              <SelectInput
                label="State"
                options={['Punjab', 'Haryana', 'Karnataka']}
                size="medium"
                placeholder="Select"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="w-full">
              <SelectInput
                label="Zip"
                size="medium"
                options={['14000', '16000', '18000']}
                placeholder="Select"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
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
