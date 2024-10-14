import React, { useEffect, useRef, useCallback, useState } from 'react';
import { OtpInputProps } from './types';

const OtpInput: React.FC<OtpInputProps> = React.memo(
  ({ length = 6, onChange }) => {
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const otpValuesRef = useRef(Array(length).fill(''));
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState<number | null>(null);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        otpValuesRef.current[index] = value;

        if (value.length === 1 && index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }

        const otp = otpValuesRef.current.join('');
        onChange(otp);
      },
      [onChange, length]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
          if (otpValuesRef.current[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
            otpValuesRef.current[index - 1] = '';
            const otp = otpValuesRef.current.join('');
            onChange(otp);
          }
        }
      },
      [onChange]
    );

    const handleMouseDown = useCallback((index: number) => {
      setIsSelecting(true);
      setSelectionStart(index);
    }, []);

    const handleMouseUp = useCallback(() => {
      setIsSelecting(false);
      setSelectionStart(null);
    }, []);

    const handleMouseEnter = useCallback(
      (index: number) => {
        if (isSelecting && selectionStart !== null) {
          const minIndex = Math.min(selectionStart, index);
          const maxIndex = Math.max(selectionStart, index);

          for (let i = minIndex; i <= maxIndex; i++) {
            inputRefs.current[i].select();
          }
        }
      },
      [isSelecting, selectionStart]
    );

    useEffect(() => {
      inputRefs.current[0]?.focus();
    }, []);

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();

        const pastedData = e.clipboardData.getData('text').slice(0, length);

        for (let i = 0; i < pastedData.length; i++) {
          if (i + index < length) {
            otpValuesRef.current[i + index] = pastedData[i];
            inputRefs.current[i + index].value = pastedData[i];
          }
        }

        const otp = otpValuesRef.current.join('');
        onChange(otp);
        inputRefs.current[
          Math.min(index + pastedData.length, length - 1)
        ].focus();
      },
      [onChange, length]
    );

    return (
      <div className="flex justify-center space-x-2" onMouseUp={handleMouseUp}>
        {[...Array(length)].map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el!)}
            type="text"
            maxLength={1}
            defaultValue={otpValuesRef.current[index]}
            className={`w-full h-full text-center bg-secondary border border-lightGray rounded focus:ring-2 focus:ring-white text-white transition-colors opacity-95`}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onPaste={(e) => handlePaste(e, index)}
            onSelect={() => {}}
          />
        ))}
      </div>
    );
  }
);

OtpInput.displayName = 'OtpInput';
export default OtpInput;
