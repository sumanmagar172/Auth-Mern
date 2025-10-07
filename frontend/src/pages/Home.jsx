import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSucess } from '../../Utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SplitText from '../ReactBits/SplitText';
import Liquid from '../ReactBits/Liquid';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handdleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSucess('User logged out successfully!');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const welcomeMsg = `Welcome, ${loggedInUser}!`;

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Liquid component as full-screen background */}
      <div className="absolute inset-0 z-0 bg-black">
        <Liquid
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* The content layer on top of the background */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Welcome card with the backdrop effect */}
        <div className="bg-white/30 backdrop-blur-xl p-8 rounded-xl shadow-lg text-center max-w-sm w-full">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            <SplitText
              text={welcomeMsg}
              className="text-4xl font-extrabold text-white text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </h1>
          <p className="text-white mb-6">
            You are now logged in and can access your dashboard.
          </p>
          <button
            onClick={handdleLogout}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Home;