import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { UserContext } from '../context/UserContext';

const SignUp: React.FC = () => {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
    
    // Enhanced validation
    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('password', password);
      
      // Only append profile image if one is selected
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      // Debug: Log what we're sending
      console.log('Sending registration data:', {
        name: name.trim(),
        email: email.trim(),
        hasProfileImage: !!profileImage
      });

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Registration response:', response.data);
      
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      } else {
        setError('Registration successful but no token received');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error || 'Registration failed';
        
        switch (status) {
          case 400:
            setError(message);
            break;
          case 409:
            setError('Email already exists. Please use a different email.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError(`Registration failed: ${message}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
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
            placeholder=" Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            disabled={isLoading}
            required
          />
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            disabled={isLoading}
            required
          />
          <input 
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            disabled={isLoading}
            minLength={6}
            required
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
            disabled={isLoading}
          />
          
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          
          <button 
            type="submit" 
            className='bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className='text-blue-600 hover:underline'>Sign In</a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;