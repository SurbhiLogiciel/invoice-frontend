import React, { useState } from 'react';
import { AvatarProps } from './types';
import  avtar  from '../../assets/avtar.png' 


export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = 'User Avatar',
    fallback = 'NA',
    size = 'medium',
    shape = 'circle',
}) => {
const [imgError, setImgError] = useState(false);

const sizeClasses = {
    small: 'w-10 h-10 text-sm',
    medium: 'w-16 h-16 text-lg',
    large: 'w-24 h-24 text-xl',
};

const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';

return (
        <div className={`flex items-center justify-center bg-gray-300 text-white font-semibold ${shapeClass} ${sizeClasses[size]}`}>
            {!imgError && src ? (
                <img
                    src={avtar}
                    alt={alt}
                    className={`object-cover w-full h-full ${shapeClass}`}
                    onError={() => setImgError(true)} 
                />
            ) : (
            <span>{fallback}</span>
            )}
        </div>
        );
};

