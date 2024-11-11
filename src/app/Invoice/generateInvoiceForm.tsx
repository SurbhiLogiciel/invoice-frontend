import React from 'react';
import { Drawer, Button } from '@mui/material';
import { Input } from '../../core-ui/input/input';
import SelectInput from '../../core-ui/input/selectInput';
import DateInput from '../../core-ui/input/dateInput';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export const InvoiceDrawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: 350,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(var(--color-secondary))',
          color: 'white',
        },
      }}
    >
      <div className="p-6">
        <h2 className="text-primary font-bold text-lg mb-4">New Invoice</h2>

        {/* Input fields */}
        <Input variant="secondary" label="Company Name" />
        <Input variant="secondary" label="Street Address" />
        <SelectInput variant="secondary" label="City" options={[]} />
        <SelectInput variant="secondary" label="State" options={[]} />
        <Input variant="secondary" label="Zip" />
        <DateInput />
        <SelectInput variant="secondary" label="Payment Terms" options={[]} />

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ color: '#fff', borderColor: '#fff' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'rgb(var(--color-primary))' }}
          >
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
