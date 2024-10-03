// components/Input.tsx
import React from 'react';

interface InputProps {
  label: string;
  type: string;
  value?: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  textarea?: boolean;
  name?:string;
  register?:any;
}

const Input: React.FC<InputProps> = ({ label, type, value, register, placeholder, textarea,name }) => {
  return (
    <div className="mb-4 leading-none">
      <label className="block text-gray-700 font-medium mb-1 text-sm">{label}</label>
      {textarea ? (
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          value={value}
          {...register(name)}
          rows={5}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          className="w-full p-2  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={value}
          {...register(name)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
