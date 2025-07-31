import React, { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100 space-y-20">
     
      <h3 className="text-2xl font-bold text-black">Expense Tracker</h3>

      
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
