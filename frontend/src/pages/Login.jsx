import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSucess } from '../../Utils';
const Login = () => {
  // Corrected 'emai' to 'email' in the state object.
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // The console.log is good for debugging, but you can remove it in production.
    console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };

  console.log(loginInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This is where you would handle form submission logic, e.g., an API call.
    // For now, let's add a success toast to show it works.
    // toast.success('Sign up form submitted successfully!');
    // Clear the form after submission
    const {email, password} = loginInfo;

    if(!email || !password) {
      return handleError('name, email and password are required')
    }

    try {
      const url = 'https://auth-mern-backend-9x5m.onrender.com';
      const response = await fetch(url, {
        method: "post",
        headers: {
          'content-Type' : 'application/json'
        },
        body: JSON.stringify(loginInfo)
      }) 
      const result = await response.json();
      console.log(result);
      const{message, success, error, name, jwtToken} = result;

      if(success) {
        handleSucess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => {
          navigate('/Home')
        }, 1000)
      } else if (error){
        const details = error?.details[0].message;
       handleError(details) 
      } else if (!success) {
        handleError(message);
      }
      
    } catch (error) {
       handleError(error)
    }
    // setSignupInfo({
    //   name: '',
    //   email: '',
    //   password: ''
    // });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold text-center text-gray-900'>Login</h1>
        <form className='space-y-6' onSubmit={handleSubmit}>
          
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              onChange={handleChange}
              // Corrected 'emai' to 'email' in the type attribute.
              type='email'
              name='email'
              value={loginInfo.email}
              placeholder='Enter Your Email...'
              className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <div className='space-y-2'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              onChange={handleChange}
              value={loginInfo.password}
              name='password'
              placeholder='Enter Your Password...'
              className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Login
            </button>
          </div>
        </form>
        <div className='text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link to='/signup' className='font-medium text-indigo-600 hover:text-indigo-500'>
            Signup
          </Link>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Login;
