import React from 'react';
import AuthLayout from '../components/AuthLayout';

const Login: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in.
        </p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input 
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;