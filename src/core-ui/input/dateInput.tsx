import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../svg/calendar';

const DateInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const datepickerRef = useRef<any>(null);

  return (
    <div className="relative w-full">
      <label className="block mb-2 text-left font-roboto font-normal text-xs text-gray">
        Issue Date
      </label>
      <div className="relative flex items-center bg-purple text-white border border-purple rounded px-5 py-3">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="dd MMM, yyyy"
          className="w-full bg-purple outline-none text-white text-sm"
          ref={datepickerRef}
        />
        <span
          className="absolute right-4 cursor-pointer"
          onClick={() => datepickerRef.current.setFocus()}
        >
          <CalendarIcon />
        </span>
      </div>
    </div>
  );
};

export default DateInput;
