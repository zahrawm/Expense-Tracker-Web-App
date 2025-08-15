import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { UserContext } from '../context/UserContext';
import { uploadImage } from '../utils/uploadImage';

const SignUp: React.FC = () => {
  const [fullName, setFullName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { updateUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!email) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      if (profileImage) {
        const imUploadRes = await uploadImage(profileImage);
        formData.append('profileImage', imUploadRes);
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to sign up.
        </p>
        
        <form onSubmit={handleSignUp}>
          <input 
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          
          {imagePreview && (
            <div className="mb-4 flex justify-center">
              <img src={imagePreview} alt="Profile preview" className="w-20 h-20 rounded-full object-cover" />
            </div>
          )}
          
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          
          <button type="submit" className='bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors'>
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className='text-blue-600 hover:underline'>Login</a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;