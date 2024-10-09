import React, { useEffect, useRef, useState, useCallback } from 'react';
import { OtpInputProps } from './types';

const OtpInput: React.FC<OtpInputProps> = React.memo(
  ({ length = 6, onChange }) => {
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState<number | null>(null);
    const [selectionEnd, setSelectionEnd] = useState<number | null>(null);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (value.length === 1 && index < length - 1) {
          inputRefs.current[index + 1].focus();
        }

        if (value.length === 0 && index > 0) {
          inputRefs.current[index - 1].focus();
        }

        const otp = inputRefs.current.map((input) => input.value).join('');
        onChange(otp);
      },
      [onChange, length]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
          if (inputRefs.current[index].value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
            inputRefs.current[index - 1].value = '';
            const otp = inputRefs.current.map((input) => input.value).join('');
            onChange(otp);
          }
        }
      },
      [onChange]
    );

    const handleMouseDown = useCallback(() => {
      setIsSelecting(true);
      setSelectionStart(null);
      setSelectionEnd(null);
    }, []);

    const handleMouseUp = useCallback(() => {
      setIsSelecting(false);
      if (selectionStart !== null && selectionEnd !== null) {
        const selectedOtp = inputRefs.current
          .slice(selectionStart, selectionEnd + 1)
          .map((input) => input.value)
          .join('');
        onChange(selectedOtp);
      }
    }, [selectionStart, selectionEnd, onChange]);

    const handleMouseEnter = useCallback(
      (index: number) => {
        if (isSelecting) {
          setSelectionEnd(index);
          for (
            let i = selectionStart !== null ? selectionStart : index;
            i <= index;
            i++
          ) {
            inputRefs.current[i].select();
          }
        }
      },
      [isSelecting, selectionStart]
    );

    const handleInputFocus = useCallback(
      (index: number) => {
        if (isSelecting) {
          if (selectionStart === null) {
            setSelectionStart(index);
          }
          inputRefs.current[index].focus();
        }
      },
      [isSelecting, selectionStart]
    );

    useEffect(() => {
      inputRefs.current[0]?.focus();
    }, []);

    return (
      <div
        className="flex justify-center space-x-2"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {[...Array(length)].map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el!)}
            type="text"
            maxLength={1}
            className={`w-input-sm h-input-height text-center bg-input-bg border border-input-border-focus rounded focus:ring-2 focus:ring-input-border-focus text-input-text placeholder:text-input-label transition-colors`}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => handleInputFocus(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onSelect={() => {}}
          />
        ))}
      </div>
    );
  }
);

export default OtpInput;
