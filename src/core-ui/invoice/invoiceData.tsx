import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { DataContainer } from '../DataContainer';
import Invoice from '../../app/svg/invoice';

const ParentComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/invoiceList'
        );
        setData(response.data.data); 
      } catch (error: any) {
        console.error(error.message); 
      }
    };

    fetchData();
  }, []);
 
  const selectedData = data.find((item) => item._id === id);
  return (
    <div>
      {selectedData ? <DataContainer children data={selectedData} /> : <Invoice />}
    </div>
  );
};

export default ParentComponent;
